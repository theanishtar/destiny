package sahlaysta.blecodict;

import java.io.DataOutputStream;
import java.io.IOException;
import java.text.Normalizer;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;

import com.github.sahlaysta.cccedict.CCCEDICTEntry;

/** Indexed and normalized dictionary searching
 * by the English definitions of 
 * entries. Normalizes the definition strings,
 * that is, strips diacritical marks, and
 * removes special characters */
final class IndexedEnglishSearchData {
	static final String[]
	normalizeDefinitions(CCCEDICTEntry entry) {
		String[] result = new String[
			entry.definitions.size()];
		for (int i = 0; i < result.length; i++)
			result[i] = normalizeDefinition(
				entry.definitions.get(i));
		return result;
	}
	
	private static final String
	normalizeDefinition(String definition) {
		String str = removeDiacritics(definition)
			.toLowerCase();
		
		// replace any symbols with period '.'
		StringBuilder sb = new StringBuilder(str.length());
		for (int i = 0, len = str.length(); i < len; i++) {
			char ch = str.charAt(i);
			
			//special character condition
			if (ch == ' '
				|| (ch >= 'a' && ch <= 'z')
				|| (ch >= '0' && ch <= '9')) {
				sb.append(ch);
				continue;
			}
			
			//remove cc-cedict pronunciation brackets []
			if (ch == '[') {
				sb.append('.');
				while (ch != ']') {
					ch = str.charAt(++i);
					sb.append('.');
				}
				continue;
			}

			//put symbols as periods
			sb.append('.');
		}
		
		//remove trailing spaces / periods
		char ch;
		while (sb.length() > 0 &&
				((ch = sb.charAt(sb.length() - 1)) == ' '
				|| ch == '.'))
			sb.setLength(sb.length() - 1);
		
		return sb.toString();
	}
	private static final String removeDiacritics(String str) {
		if (str == null)
			return null;
		if (str.isEmpty())
			return "";
		
		int len = str.length();
		StringBuilder sb = new StringBuilder(len);
		
		//iterate string codepoints
		for (int i = 0; i < len; ) {
			int codePoint = str.codePointAt(i);
			int charCount
				= Character.charCount(codePoint);
			
			if (charCount > 1) {//is surrogate pair
				for (int j = 0; j < charCount; j++)
					sb.append(str.charAt(i + j));
				i += charCount;
				continue;
			}
			else if (codePoint <= 127) {//not special char
				sb.append((char)codePoint);
				i++;
				continue;
			}
			
			//normalize char
			char c = (char)codePoint;
			sb.append(
				Normalizer.normalize(
					Character.toString(c),
					Normalizer.Form.NFD)
				.charAt(0));
			i++;
		}
		
		return sb.toString();
	}
	
	
	static final void
	writeData(
			DataOutputStream dos,
			List<CCCEDICTEntry> cccedict)
				throws IOException {
		
		//indexing data
		/* maps the substring of
		 * first 3 letters of every word of each
		 * definition, to its index in the list */
		MultiValueMap<String, Integer> mvm
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
		for (int i = 0; i < cccedict.size(); i++) {
			CCCEDICTEntry entry = cccedict.get(i);
			for (String d: normalizeDefinitions(entry)) {
				addToMultiValueMap(d, i, mvm);
				addToMultiValueMap(d.replace(".", ""), i, mvm);
			}
		}
		
		//Write data
		dos.writeChar(mvm.getNodeCount());
		for (MultiValueMap.MVMNode
				<String, Collection<Integer>>
				node: mvm) {
			BlecoDict.writeString(dos, node.key);
			dos.writeChar(node.value.size());
			for (int i: node.value)
				dos.writeInt(i);
		}
	}
	
	/** Put the first 3 letters of each
	 * word in each definition to the
	 * multivaluemap */
	private static final void addToMultiValueMap(
			String definition,
			int index,
			MultiValueMap<String, Integer> mvm) {
		int len = definition.length();
		int startIndex = 0, endIndex = 0;
		for (int i = 0; i < len; i++) {
			char ch = definition.charAt(i);
			
			if (ch == ' ' || ch == '.') {
				endIndex = i;
				while (ch == ' ' || ch == '.')
					ch = definition.charAt(++i);
				putToMultiValueMap(
					definition.substring(
						startIndex,
						endIndex),
					index,
					mvm);
				startIndex = i;
			}
			if (i == len - 1) {
				putToMultiValueMap(
					definition.substring(
						startIndex,
						i + 1),
					index,
					mvm);
			}
		}
	}
	private static final void putToMultiValueMap(
			String str,
			int index,
			MultiValueMap<String, Integer> mvm) {
		int len = str.length();
		for (int i = 1; i <= 3 && i <= len; i++) {
			String substr = str.substring(0, i);
			if (substr.length() == 0)
				continue;
			mvm.put(substr, index);
		}
	}
}