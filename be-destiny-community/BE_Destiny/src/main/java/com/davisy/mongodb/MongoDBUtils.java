package com.davisy.mongodb;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.FindOneAndReplaceOptions;
import com.mongodb.client.model.ReturnDocument;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.InsertManyResult;
import com.mongodb.client.result.InsertOneResult;

@Component
public class MongoDBUtils {

	@Autowired
	MongoClient client;

	@Value("${davis.mongodb.database}")
	private String dbName;

	// tìm theo trường "name"
	public <T> T findByName(T document, Class<T> documentClass, String collectionName, String name) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		try {
			Bson findPotato = Filters.eq("name", name);
			T firstPotato = collection.find(findPotato).first();
			if (firstPotato == null) {
				System.out.println("Couldn't find any Object containing " + name + " as an ingredient in MongoDB.");

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
	public <T> List<T> findAllByName(T document, Class<T> documentClass, String collectionName, String name) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		Bson findPotato = Filters.eq("name", name);
		try {
			FindIterable<T> foundPotatoes = collection.find(findPotato);

			List<T> list = StreamSupport.stream(foundPotatoes.spliterator(), false).collect(Collectors.toList());

			if (list.size() == 0) {
				System.out.println("Couldn't find any recipes containing 'potato' as an ingredient in MongoDB.");
			} else {
				return list;
			}

		} catch (MongoException me) {
			System.err.println("Unable to find a recipe to update in MongoDB due to an error: " + me);
			System.exit(1);
		}
		return null;
	}

	// tìm tất cả
	public <T> List<T> findAll(T document, Class<T> documentClass, String collectionName) {
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
				System.exit(1);
			} else {
				return list;
			}
		} catch (MongoException me) {
			System.err.println("Không thể tìm tài liệu trong MongoDB do lỗi: " + me);
			System.exit(1);
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
	public <T> T updateFirstByName(Class<T> documentClass, String collectionName, String name,
			T newDocument) {

		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		Bson findPotato = Filters.eq("name", name);

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

	// Cập nhật theo trường "_id" (_id là khóa chính và tự tạo)
	public <T> T updateBy_Id(T document, Class<T> documentClass, String collectionName, String _id, T newDocument) {

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
	public <T> long deletesByName(T document, Class<T> documentClass, String collectionName, String name) {
		MongoDatabase database = client.getDatabase(dbName);
		// MongoCollection defines a connection to a specific collection of documents in
		// a specific database
		MongoCollection<T> collection = database.getCollection(collectionName, documentClass);

		Bson deleteFilter = Filters.in("name", Arrays.asList(name));
		try {
			DeleteResult deleteResult = collection.deleteMany(deleteFilter);
			return deleteResult.getDeletedCount();
		} catch (MongoException me) {
			System.err.println("Unable to delete any recipes due to an error: " + me);
		}
		return -1;
	}
}
