package sahlaysta.blecodict;

import java.io.DataOutputStream;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;

import com.github.sahlaysta.cccedict.CCCEDICTEntry;

/** Indexed Chinese search data. Indexes
 * the lowest byte of Unicode Chinese characters.
 * (No odd numbers, so if odd subtract 1. So there
 * are max 128 indexes) */
final class IndexedChineseSearchData {
	
	static final void
	writeData(
			DataOutputStream dos,
			List<CCCEDICTEntry> cccedict)
				throws IOException {
		
		//Add lowest byte of code points
		MultiValueMap<Byte, Integer> mvm
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
		for (int i = 0; i < cccedict.size(); i++)
			addCodePointsToMultiValueMap(
				cccedict.get(i),
				i,
				mvm);
		
		//Write data
		dos.writeChar(mvm.getNodeCount());
		for (MultiValueMap.MVMNode
				<Byte, Collection<Integer>>
				node: mvm) {
			dos.writeByte(node.key);
			dos.writeChar(node.value.size());
			for (int i: node.value)
				dos.writeInt(i);
		}
	}
	
	static final void
	addCodePointsToMultiValueMap(
				CCCEDICTEntry e,
				int index,
				MultiValueMap<Byte, Integer> mvm) {
		addStringCodePoints(
			e.simplified,
			index,
			mvm);
		addStringCodePoints(
			e.traditional,
			index,
			mvm);
	}
	static final void addStringCodePoints(
			String str,
			int index,
			MultiValueMap<Byte, Integer> mvm) {
		str.codePoints()
			.forEach((codePoint) -> {
				mvm.put(t(codePoint), index);
				if (codePoint <= 9000) { //if english letter
					mvm.put(
						t(
							Character.toUpperCase(
								(char)codePoint)),
						index);
					mvm.put(
						t(
							Character.toLowerCase(
								(char)codePoint)),
						index);
				}
			});
	}
	static final byte t(int codePoint) {
		/* convert to lowest byte from Unicode
		 * character code point. No odd numbers,
		 * so if odd subtract 1 */
		if (codePoint % 2 != 0)
			codePoint--;
		return (byte)((codePoint)&0xFF);
	}
}