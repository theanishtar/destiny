package sahlaysta.blecodict;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.List;

import com.github.sahlaysta.cccedict.CCCEDICTEntry;
import com.github.sahlaysta.cccedict.CCCEDICTParser;
import com.github.sahlaysta.cccedict.CCCEDICTPinyin;

/**
 * BlecoDict is a console program that generates .bleco file
 * for Bleco GUI. For generation, it uses 3 files that you
 * need to download first:<br>
 * 
 * 1. a CC-CEDICT file, named <code>"cedict_ts.u8"</code>,
 * download here:
 * <b>https://www.mdbg.net/chinese/dictionary?page=cc-cedict</b>
 * (Select cedict_1_0_ts_utf-8_mdbg.zip)
 * 
 * <br>2. a Chinese sentences Tatoeba file, named
 * <code>"cmn_sentences.tsv"</code>, download here:
 * <b>https://tatoeba.org/en/downloads</b> (under "Sentences",
 * select "Only sentences in: Mandarin Chinese"
 * 
 * <br>3. a Chinese-English example sentences Tatoeba file,
 * named <code>"Sentence pairs in Mandarin
 * Chinese-English (date).tsv"</code>, download here:
 * <b>https://tatoeba.org/en/downloads</b> (select "Sentence
 * pairs", select "Sentence language: Mandarin Chinese",
 * "Translation language: English")<br><br>
 * 
 * 
 * Run BlecoDict with arguments like this
 * in this order:
 * <code>
 * blecodict.jar
 * cedict_ts.u8
 * cmn_sentences.tsv
 * SentencepairsinMandarinChinese-English.tsv
 * outputfile.bleco
 * </code>
 * 
 * @author sahlaysta
 * */
public final class BlecoDict {
	
	private BlecoDict() {}
	
	
	/** Main of {@link BlecoDict}
	 * 
	 * @param args args to generate .blecodict, format:<br>
	 * <code>blecodict.jar cedict_ts.u8 cmn_sentences.tsv
	 * SentencepairsinMandarinChinese-English.tsv
	 * outputfile.bleco</code>
	 * @see {@link BlecoDict} */
	public static void main(String[] args) {
		File cccedictFile = null;
		File tatoeba1File = null;
		File tatoeba2File = null;
		File outputFile = null;
		if (args.length == 0) {
			cccedictFile = consolePromptFile(
				"CC-CEDICT");
			tatoeba1File = consolePromptFile(
				"Tatoeba Chinese sentences");
			tatoeba2File = consolePromptFile(
				"Tatoeba Chinese-English sentences");
			outputFile = consolePromptFile(
				"output");
		} else if (args.length == 4) {
			cccedictFile = new File(args[0]);
			tatoeba1File = new File(args[1]);
			tatoeba2File = new File(args[2]);
			outputFile = new File(args[3]);
		} else {
			System.out.println("Bad args, usage:"
				+ "\nblecodict.jar"
				+ " cccedictfile"
				+ " tatoeba1file"
				+ " tatoeba2file"
				+ " outputfile.bleco");
			consoleExit();
		}
		
		try {
			generateBlecoDict(
				cccedictFile,
				tatoeba1File,
				tatoeba2File,
				outputFile);
		} catch (Exception e) {
			e.printStackTrace();
			consoleExit();
		}
	}
	static final void consoleExit() {
		System.out.println(
			"\r\nPress enter key to exit...");
		try {
			System.in.read();
		} catch (IOException e) {}
		System.exit(0);
	}
	static final
	File consolePromptFile(String fileDescription) {
		File result = null;
		System.out.println(
			"Enter the path of the "
			+ fileDescription + " file: ");
		BufferedReader br = new BufferedReader(
			new InputStreamReader(System.in));
		try {
			String consoleInput = br.readLine();
			result = new File(consoleInput);
		} catch (IOException e) {}
		return result;
	}
	
	
	//Generate blecodict
	static final void generateBlecoDict(
			File cccedictFile,
			File tatoeba1File,
			File tatoeba2File,
			File outputFile)
				throws Exception {
		
		DataOutputStream dos
			= new DataOutputStream(
				new BufferedOutputStream(
					new FileOutputStream(
						outputFile)));

		System.out.println("Generating...");
		
		ExampleSentence[] examplSents
			= ExampleSentence.parse(tatoeba2File);
		writeExampleSentences(dos, examplSents);
		
		List<CCCEDICTEntry> cccedict
			= CCCEDICTParser.parse(cccedictFile);
		
		EntrySorter.sort(cccedict, tatoeba1File);
		writeEntries(dos, cccedict, examplSents);

		IndexedChineseSearchData
			.writeData(dos, cccedict);
		IndexedEnglishSearchData
			.writeData(dos, cccedict);
		IndexedPinyinSearchData
			.writeData(dos, cccedict);
		
		dos.close();
		
		System.out.println("Successfully generated");
		consoleExit();
	}

	//write Chinese-English example sentences
	static final void writeExampleSentences(
			DataOutputStream dos,
			ExampleSentence[] exampleSentences)
				throws IOException {
		dos.writeInt(exampleSentences.length);
		for (ExampleSentence es: exampleSentences) {
			writeString(dos, es.chinese);
			writeString(dos, es.english);
		}
	}
	
	//write Chinese-English dictionary entries
	static final void writeEntries(
			DataOutputStream dos,
			Collection<CCCEDICTEntry> entries,
			ExampleSentence[] exampleSentences)
				throws IOException {
		
		MultiValueMap<Integer, Integer> mvm
			= ExampleSentence.multiValueMap(
				exampleSentences);
		dos.writeInt(entries.size());
		for (CCCEDICTEntry entry: entries) {
			writeEntry(
				dos,
				entry,
				IndexedEnglishSearchData
					.normalizeDefinitions(
						entry),
				ExampleSentence
					.indexesOf(
						entry,
						exampleSentences,
						mvm));
		}
	}
	static final void writeEntry(
			DataOutputStream dos,
			CCCEDICTEntry entry,
			String[] normalizedDefinitions,
			int[] exampleSentenceIndexes)
				throws IOException {
		
		writeString(dos, entry.simplified);
		writeString(dos, entry.traditional);
		writeString(dos, entry.pronunciation);
		writeString(dos, CCCEDICTPinyin
			.toFormattedPinyin(entry));
		dos.write(entry.definitions.size());
		for (String str: entry.definitions)
			writeString(dos, str);
		for (String str: normalizedDefinitions)
			writeString(dos, str);
		dos.writeInt(exampleSentenceIndexes.length);
		for (int i: exampleSentenceIndexes)
			dos.writeInt(i);
	}
	
	static final void writeString(
			DataOutputStream dos,
			String str)
				throws IOException {
		byte[] b = str.getBytes(StandardCharsets.UTF_8);
		dos.writeChar(b.length);
		dos.write(b);
	}
}