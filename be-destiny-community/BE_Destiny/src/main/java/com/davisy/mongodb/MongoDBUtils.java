package com.davisy.mongodb;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.FindOneAndReplaceOptions;
import com.mongodb.client.model.ReturnDocument;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.InsertManyResult;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;

@Component
public class MongoDBUtils {

	@Autowired
	MongoClient client;

	@Value("${davis.mongodb.database}")
	private String dbName;

	// tìm theo trường
	public <T> T findByColumn(Class<T> documentClass, String collectionName, String column, String dataColumn) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		try {
			Bson findPotato = Filters.eq(column, dataColumn);
			T firstPotato = collection.find(findPotato).first();
			if (firstPotato == null) {
				System.out
						.println("Couldn't find any Object containing " + dataColumn + " as an ingredient in MongoDB.");

			} else {
				System.out.println(firstPotato.toString());
				return firstPotato;
			}
		} catch (MongoException me) {
			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
		}
		return null;
	}

	// tìm theo 2 trường
	public <T> T findByTwoColumn(Class<T> documentClass, String collectionName, String column1, String dataColumn1,
			String column2, String dataColumn2) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		try {
			Bson filter = Filters.and(Filters.eq(column1, dataColumn1), Filters.eq(column2, dataColumn2));
			T firstPotato = collection.find(filter).first();
			if (firstPotato == null) {
				System.out.println("Couldn't find any Object containing " + dataColumn1 + "and" + dataColumn2
						+ " as an ingredient in MongoDB.");

			} else {
				System.out.println(firstPotato.toString());
				return firstPotato;
			}
		} catch (MongoException me) {
			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
		}
		return null;
	}

	// tìm theo Id
	public <T> T findById(Class<T> documentClass, String collectionName, ObjectId _id) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		try {
			Bson findPotato = Filters.eq("_id", _id);
			T firstPotato = collection.find(findPotato).first();
			if (firstPotato == null) {
				System.out.println("Couldn't find any Object containing " + _id + " as an ingredient in MongoDB.");

			} else {
				System.out.println(firstPotato.toString());
				return firstPotato;
			}
		} catch (MongoException me) {
			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
		}
		return null;
	}

	// tìm tất cả theo trường "name"
	public <T> List<T> findAllByColumn(Class<T> documentClass, String collectionName, String column,
			String dataColumn) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		Bson findPotato = Filters.eq(column, dataColumn);
		try {
			FindIterable<T> foundPotatoes = collection.find(findPotato);

			List<T> list = StreamSupport.stream(foundPotatoes.spliterator(), false).collect(Collectors.toList());

			if (list.size() == 0) {
				System.out.println("Couldn't find any recipes containing " + column + " as an ingredient in MongoDB.");
				return list;
			} else {
				return list;
			}

		} catch (MongoException me) {
			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
		}
		return null;
	}

	// tìm tất cả
	public <T> List<T> findAll(Class<T> documentClass, String collectionName) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		Bson emptyFilter = new Document(); // Tạo một bộ lọc rỗng

		try {
			FindIterable<T> allDocuments = collection.find(emptyFilter);

			List<T> list = StreamSupport.stream(allDocuments.spliterator(), false).collect(Collectors.toList());

			if (list.isEmpty()) {
				System.out.println("Không tìm thấy bất kỳ tài liệu nào trong MongoDB.");
				return list;
			} else {
				return list;
			}
		} catch (MongoException me) {
			System.err.println("Không thể tìm tài liệu trong MongoDB do lỗi: " + me);
		}
		return null;

	}

	// Thêm
	public <T> T insert(T document, Class<T> documentClass, String collectionName) {
		// MongoDatabase defines a connection to a specific MongoDB database
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		try {
			InsertOneResult result = collection.insertOne(document);

			System.out.println("Inserted " + result.getInsertedId().toString() + " documents.\n");

			return document;
		} catch (MongoException me) {
			System.err.println("Unable to insert any documents into MongoDB due to an error: " + me);
			return null;
		}
	}

	// Thêm list
	public <T> List<T> inserts(List<T> items, String collectionName) {

		// MongoDatabase defines a connection to a specific MongoDB database
		MongoDatabase database = client.getDatabase(dbName);

		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, (Class<T>) items.get(0).getClass());

		try {
			InsertManyResult result = collection.insertMany(items);

			System.out.println("Inserted " + result.getInsertedIds().size() + " documents.\n");

			return items;
		} catch (MongoException me) {
			System.err.println("Unable to insert any items into MongoDB due to an error: " + me);
			return null;
		}
	}

	// Cập nhật theo trường "name"
	public <T> T updateFirstByColumn(Class<T> documentClass, String collectionName, String column, String dataColumn,
			T newDocument) {

		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		Bson findPotato = Filters.eq(column, dataColumn);

		FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(ReturnDocument.AFTER);

		try {
			T updatedDocument = collection.findOneAndReplace(findPotato, newDocument, options);
			if (updatedDocument == null) {
				return null;
			} else {
				return newDocument;
			}
		} catch (MongoException me) {
			return null;
		}
	}

	public <T> long updateAllByColumn(Class<T> documentClass, String collectionName, String column, String dataColumn,
			T newDocument) {
		MongoDatabase database = client.getDatabase(dbName);
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		Bson filter = Filters.eq(column, dataColumn);
		UpdateOptions options = new UpdateOptions().upsert(false);

		// Your update fields and values
		Document updateDocument = new Document("$set", newDocument);

		try {
			UpdateResult updateResult = collection.updateMany(filter, updateDocument, options);
			return updateResult.getModifiedCount();
		} catch (MongoException me) {
			return 0;
		}
	}
	
	// update status cho notification
	public <T> long updateStatusNotification(Class<T> documentClass, String collectionName, Boolean statusUpdate) {
	    MongoDatabase database = client.getDatabase(dbName);
	    MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

	    // Filter for documents where the status is false
	    Document filter = new Document("status", !statusUpdate);

	    // Update fields and values, setting status to true
	    /*
	     * upsert(false) (mặc định):

			Khi upsert được đặt thành false, nghĩa là bạn không muốn thực hiện việc thêm mới (insert) bản ghi nếu không tìm thấy bản ghi nào khớp với điều kiện tìm kiếm.
			Nếu không tìm thấy bản ghi nào khớp với điều kiện, thì không có thay đổi hoặc thêm mới sẽ xảy ra. Có nghĩa là nó chỉ cập nhật các bản ghi đã tồn tại.
			upsert(true):
			
			Khi upsert được đặt thành true, nếu không tìm thấy bản ghi nào khớp với điều kiện tìm kiếm, MongoDB sẽ thêm mới một bản ghi dựa trên điều kiện tìm kiếm và các thông tin cập nhật bạn cung cấp.
			Nếu không có bản ghi nào khớp, MongoDB sẽ chèn một bản ghi mới thay vì chỉ cập nhật các bản ghi đã tồn tại.
	     */
	    Document updateDocument = new Document("$set", new Document("status", statusUpdate));

	    // Update all documents that match the filter
	    UpdateOptions options = new UpdateOptions().upsert(false);
	    
	    try {
			UpdateResult updateResult = collection.updateMany(filter, updateDocument, options);
			return updateResult.getModifiedCount();
		} catch (MongoException me) {
			return 0;
		}
	}

	// Cập nhật theo trường "_id" (_id là khóa chính và tự tạo)
	public <T> T updateBy_Id(T document, Class<T> documentClass, String collectionName, ObjectId _id, T newDocument) {

		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		// Tạo bộ lọc để tìm tài liệu dựa trên ID
		Bson filter = Filters.eq("_id", _id);

		try {
			T updatedDocument = collection.findOneAndReplace(filter, newDocument);
			if (updatedDocument == null) {
				return null;
			} else {
				return newDocument;
			}
		} catch (MongoException me) {
			return null;
		}
	}

	// xóa tất cả theo trường "name"
	public <T> long deleteById(Class<T> documentClass, String collectionName, ObjectId _id) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);
		Bson deleteFilter = Filters.eq("_id", _id);
		// Tạo bộ lọc để tìm tài liệu dựa trên ID
		try {
			DeleteResult deleteResult = collection.deleteOne(deleteFilter);
			return deleteResult.getDeletedCount();
		} catch (MongoException me) {
			System.err.println("Unable to delete any recipes due to an error: " + me);
		}
		return -1;
	}

	// xóa tất cả theo trường "name"
	public <T> long deletesByColumn(Class<T> documentClass, String collectionName, String column, String dataColumn) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		Bson deleteFilter = Filters.in(column, Arrays.asList(dataColumn));
		try {
			DeleteResult deleteResult = collection.deleteMany(deleteFilter);
			return deleteResult.getDeletedCount();
		} catch (MongoException me) {
			System.err.println("Unable to delete any recipes due to an error: " + me);
		}
		return -1;
	}
	
	// Lấy độ dài 1 collection
		public long lengthCollection(String collectionName) {
			MongoDatabase database = client.getDatabase(dbName);
			MongoCollection<Document> collection = database.getCollection(collectionName);
			long collectionSize = collection.estimatedDocumentCount();
			return collectionSize;
		}

	// tìm theo trường "post_reported_id"
//	public <T> T findByPostReportedId(T document, Class<T> documentClass, String collectionName, int post_reported_id) {
//		MongoDatabase database = client.getDatabase(dbName);
//		// MongoCollection defines a connection to a specific collection of documents in
//		// a specific database
//		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);
//
//		try {
//			Bson findPotato = Filters.eq("post_reported_id", post_reported_id);
//			T firstPotato = collection.find(findPotato).first();
//			if (firstPotato == null) {
//				System.out.println(
//						"Couldn't find any Object containing " + post_reported_id + " as an ingredient in MongoDB.");
//
//			} else {
//				System.out.println(firstPotato.toString());
//				return firstPotato;
//			}
//		} catch (MongoException me) {
//			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
//		}
//		return null;
//	}

	// tìm tất cả theo trường "post_reported_id"
//	public <T> List<T> findAllByPostReportedId(T document, Class<T> documentClass, String collectionName,
//			int post_reported_id) {
//		MongoDatabase database = client.getDatabase(dbName);
//		// MongoCollection defines a connection to a specific collection of documents in
//		// a specific database
//		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);
//
//		Bson findPotato = Filters.eq("post_reported_id", post_reported_id);
//		try {
//			FindIterable<T> foundPotatoes = collection.find(findPotato);
//
//			List<T> list = StreamSupport.stream(foundPotatoes.spliterator(), false).collect(Collectors.toList());
//
//			if (list.size() == 0) {
//				System.out.println("Couldn't find any recipes containing 'potato' as an ingredient in MongoDB.");
//			} else {
//				return list;
//			}
//
//		} catch (MongoException me) {
//			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
//		}
//		return null;
//	}

	// tìm tất cả theo trường "user_reported_id"
//	public <T> List<T> findAllByUserReportedId(T document, Class<T> documentClass, String collectionName,
//			int user_reported_id) {
//		MongoDatabase database = client.getDatabase(dbName);
//		// MongoCollection defines a connection to a specific collection of documents in
//		// a specific database
//		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);
//
//		Bson findPotato = Filters.eq("user_reported_id", user_reported_id);
//		try {
//			FindIterable<T> foundPotatoes = collection.find(findPotato);
//
//			List<T> list = StreamSupport.stream(foundPotatoes.spliterator(), false).collect(Collectors.toList());
//
//			if (list.size() == 0) {
//				System.out.println("Couldn't find any recipes containing 'potato' as an ingredient in MongoDB.");
//			} else {
//				return list;
//			}
//
//		} catch (MongoException me) {
//			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
//		}
//		return null;
//	}

	// tìm theo trường "post_reported_id"
//	public <T> T findByUserReportedId(T document, Class<T> documentClass, String collectionName, int user_reported_id) {
//		MongoDatabase database = client.getDatabase(dbName);
//		// MongoCollection defines a connection to a specific collection of documents in
//		// a specific database
//		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);
//
//		try {
//			Bson findPotato = Filters.eq("user_reported_id", user_reported_id);
//			T firstPotato = collection.find(findPotato).first();
//			if (firstPotato == null) {
//				System.out.println(
//						"Couldn't find any Object containing " + user_reported_id + " as an ingredient in MongoDB.");
//
//			} else {
//				System.out.println(firstPotato.toString());
//				return firstPotato;
//			}
//		} catch (MongoException me) {
//			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
//		}
//		return null;
//	}

	// tìm theo trường "user_send_report_id"
//	public <T> T findUserByUserSendReportId(T document, Class<T> documentClass, String collectionName,
//			int user_send_report_id) {
//		MongoDatabase database = client.getDatabase(dbName);
//		// MongoCollection defines a connection to a specific collection of documents in
//		// a specific database
//		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);
//
//		try {
//			Bson findPotato = Filters.eq("user_send_report_id", user_send_report_id);
//			T firstPotato = collection.find(findPotato).first();
//			if (firstPotato == null) {
//				System.out.println(
//						"Couldn't find any Object containing " + user_send_report_id + " as an ingredient in MongoDB.");
//
//			} else {
//				System.out.println(firstPotato.toString());
//				return firstPotato;
//			}
//		} catch (MongoException me) {
//			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
//		}
//		return null;
//	}
}
