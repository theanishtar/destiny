package sahlaysta.blecodict;

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

import sahlaysta.blecodict.MultiValueMap.MVMNode;

//Class that maps a Collection to each key
final class MultiValueMap<K, V>
	implements Iterable<MVMNode<K, Collection<V>>> {
	
	private final Map
		<K, Collection<V>> map;
	private final CollectionManager<V> cm;
	public MultiValueMap(
			Map<K, Collection<V>> map,
			CollectionManager<V> cm) {
		this.map = map;
		this.cm = cm;
	}
	
	public interface CollectionManager<V> {
		public Collection<V> newCollection();
	}
	
	public void put(K key, V value) {
		Collection<V> c = map.get(key);
		if (c == null) {
			Collection<V> newC = cm.newCollection();
			newC.add(value);
			map.put(key, newC);
		} else {
			c.add(value);
		}
	}
	
	public Collection<V> get(K key) {
		return map.get(key);
	}
	
	public int getCount(K key) {
		Collection<V> c = map.get(key);
		return c == null ? 0 : c.size();
	}
	
	public MVMNode<K, Collection<V>> getHighest() {
		if (map.size() == 0)
			return null;
		int highest = Integer.MIN_VALUE;
		MVMNode<K, Collection<V>> result = null;
		Iterator<MVMNode<K, Collection<V>>> it
			= iterator();
		while (it.hasNext()) {
			MVMNode<K, Collection<V>> m = it.next();
			int size = m.value.size();
			if (size >= highest) {
				highest = size;
				result = m;
			}
		}
		return result;
	}
	
	public MVMNode<K, Collection<V>> getLowest() {
		if (map.size() == 0)
			return null;
		int lowest = Integer.MAX_VALUE;
		MVMNode<K, Collection<V>> result = null;
		Iterator<MVMNode<K, Collection<V>>> it
			= iterator();
		while (it.hasNext()) {
			MVMNode<K, Collection<V>> m = it.next();
			int size = m.value.size();
			if (size <= lowest) {
				lowest = size;
				result = m;
			}
		}
		return result;
	}
	
	public int getNodeCount() {
		return map.size();
	}
	
	public void forEach(
		BiConsumer<? super K, ? super Collection<V>>
			action) {
		map.forEach((k, v) -> action.accept(k, v));
	}
	
	
	//iterator
	public
	Iterator<MultiValueMap.MVMNode<K, Collection<V>>>
	iterator() {
		return new Iterator
		<MultiValueMap.MVMNode<K, Collection<V>>> () {
			private Iterator<Map.Entry<K, Collection<V>>>
				it = map.entrySet().iterator();
			@Override
			public boolean hasNext() {
				return it.hasNext();
			}
			@Override
			public MultiValueMap.MVMNode<K, Collection<V>>
			next() {
				Map.Entry<K, Collection<V>> entry
					= it.next();
				return new MultiValueMap.MVMNode<>(
					entry.getKey(),
					entry.getValue());
			}
			@Override
			public void remove() {
				it.remove();
			}
			@Override
			public void forEachRemaining(
					Consumer<? super
					MultiValueMap.MVMNode<K, Collection<V>>>
						action) {
				it.forEachRemaining((e) -> {
					action.accept(
						new MultiValueMap.MVMNode<>(
							e.getKey(),
							e.getValue()));
				});
			}
		};
	}
	public static class MVMNode<K, V> {
		public final K key;
		public final V value;
		public MVMNode(K key, V value) {
			this.key = key;
			this.value = value;
		}
	}
}