package sahlaysta.blecodict;

import java.io.DataOutputStream;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;

import com.github.sahlaysta.cccedict.CCCEDICTEntry;

/* The indexed pinyin search data. Indexes the
 * first two letters of the pinyin
 * of every entry */
final class IndexedPinyinSearchData {
	
	static final void
		writeData(
			DataOutputStream dos,
			List<CCCEDICTEntry> cccedict)
				throws IOException {

		/* maps the substring of
		 * first 2 characters of every
		 * pinyin string,
		 * to its index in the list
		 * for example the pinyin entry */
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
			CCCEDICTEntry e = cccedict.get(i);
			if (e.pronunciation.length() < 2)
				continue;
			
			String key = e.pronunciation.substring(0, 2)
				.toLowerCase();
			mvm.put(key, i);
			
			
			
			/* Map short pinyin with tones, for example
			 * maps the pinyin entry "a1 fu4",
			 * to "af" and "a1" and "a " */
			
			//"a1 fu4" to "af"
			if (e.pronunciation.length() > 3) {
				switch (key.charAt(1)) {
				case '1': case '2': case '3':
				case '4': case '5':
					key = new String(
						new char[] {
							key.charAt(0),
							e.pronunciation
								.charAt(3) })
						.toLowerCase();
					mvm.put(key, i);
				}
			}
			
			//"a1 fu4" to "a "
			if (e.pronunciation.length() > 3
				&& e.pronunciation.charAt(2) == ' ') {
				key = new String(
					new char[] {
						key.charAt(0),
						' ' })
					.toLowerCase();
				mvm.put(key, i);
			}
			
			//rare case
			if (e.pronunciation.length() > 2
				&& key.charAt(1) == ' ') {
				key = new String(
					new char[] {
						key.charAt(0),
						e.pronunciation
							.charAt(2) })
					.toLowerCase();
				mvm.put(key, i);
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
}