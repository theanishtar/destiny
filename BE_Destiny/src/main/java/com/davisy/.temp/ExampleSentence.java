package sahlaysta.blecodict;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.github.sahlaysta.cccedict.CCCEDICTEntry;

final class ExampleSentence {
	final String chinese, english;
	ExampleSentence(String chinese, String english) {
		this.chinese = chinese;
		this.english = english;
	}
	
	/* Parse from SentencepairsinMandarinChinese-English.tsv
	 * file */
	static final ExampleSentence[]
	parse(File tatoebaFile)
			throws IOException {
		List<ExampleSentence> result
			= new ArrayList<>();
		
		BufferedReader br
			= new BufferedReader(
				new FileReader(
					tatoebaFile));
		
		//Read Chinese-English example sentences in the file
		while (true) {
			//skip tag
			while (br.read() != '\t');
			
			//read Chinese sentence
			StringBuilder sb = new StringBuilder();
			int read;
			while ((read = br.read()) != '\t')
				sb.append((char)read);
			String chinese = sb.toString();
			
			//skip tag
			while (br.read() != '\t');
			
			//read English sentence
			String english = br.readLine();			
			
			/* Add, or replace if same Chinese sentence
			 * is already contained in the list */
			Iterator<ExampleSentence> it
				= result.iterator();
			while (it.hasNext()) {
				String i = it.next().chinese;
				if (i.hashCode() == chinese.hashCode()
					&& i.equals(chinese)) {
					it.remove();
					break;
				}
			}
			result.add(
				new ExampleSentence(chinese, english));
			
			//eof
			if (br.read() == -1)
				break;
		}
		
		br.close();
		
		ExampleSentence[] arr
			= new ExampleSentence[result.size()];
		for (int i = 0; i < arr.length; i++)
			arr[i] = result.get(i);
		return arr;
	}
	
	static final MultiValueMap<Integer, Integer>
	multiValueMap(ExampleSentence[] exampleSentences) {
		
		/* MultiValueMap, maps Unicode code points
		 * to the index of the example sentence
		 * in the exampleSentences array */
		MultiValueMap<Integer, Integer> mvm
			= new MultiValueMap<>(
				new HashMap<>(),
				new MultiValueMap
				.CollectionManager<Integer>() {
					@Override
					public Collection<Integer>
							newCollection() {
						return new LinkedHashSet<>();
					}
				});
		
		//Populate multivaluemap
		for (int i = 0; i < exampleSentences.length; i++) {
			String s = exampleSentences[i].chinese;
			
			//iterate string code points
			Iterator<Integer> it
				= s.codePoints().iterator();
			while (it.hasNext()) {
				int codePoint = it.next();
				mvm.put(codePoint, i);
			}
		}
		
		return mvm;
	}
	
	static final int LIMIT = 30;
	static final int[] indexesOf(
			CCCEDICTEntry entry,
			ExampleSentence[] exampleSentences,
			MultiValueMap<Integer, Integer> mvm) {
		/* Get the example sentences that contain the
		 * simplified/traditional text of the
		 * given CCCEDICT Entry */
		
		Set<Integer> resultSet = new LinkedHashSet<>();
		
		//check simplified
		Collection<Integer> smpl
			= mvm.get(entry.simplified.codePointAt(0));
		if (smpl != null) {
			for (int index: smpl) {
				if (resultSet.size() > LIMIT / 2)
					break;
				ExampleSentence es
					= exampleSentences[index];
				if (es.chinese.contains(entry.simplified))
					resultSet.add(index);
			}
		}
		
		//check traditional
		Collection<Integer> trad
			= mvm.get(entry.traditional.codePointAt(0));
		if (trad != null) {
			for (int index: trad) {
				if (resultSet.size() > LIMIT)
					break;
				ExampleSentence es
					= exampleSentences[index];
				if (es.chinese.contains(entry.traditional))
					resultSet.add(index);
			}
		}
		
		//return result as array
		int[] result = new int[resultSet.size()];
		int i = 0;
		for (int exampleSentenceIndex: resultSet)
			result[i++] = exampleSentenceIndex;
		return result;
	}
}