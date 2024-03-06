package com.davisy.config;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.davisy.mongodb.documents.BadWord;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertManyResult;

import io.lettuce.core.dynamic.annotation.CommandNaming;


@Configuration
public class MongoDBConfig {
	@Value("${davis.mongodb.uri}")
	private String uri;

	@Bean
	public MongoClient client() {
		Logger.getLogger("org.mongodb.driver").setLevel(Level.WARNING);
		// TODO:
		// Replace the placeholder connection string below with your
		// Altas cluster specifics. Be sure it includes
		// a valid username and password! Note that in a production environment,
		// you do not want to store your password in plain-text here.
		ConnectionString mongoUri = new ConnectionString(uri);

		// Provide the name of the database and collection you want to use.
		// If they don't already exist, the driver and Atlas will create them
		// automatically when you first write data.

		// a CodecRegistry tells the Driver how to move data between Java POJOs (Plain
		// Old Java Objects) and MongoDB documents
		CodecRegistry pojoCodecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
				fromProviders(PojoCodecProvider.builder().automatic(true).build()));

		// The MongoClient defines the connection to our MongoDB datastore instance
		// (Atlas) using MongoClientSettings
		// You can create a MongoClientSettings with a Builder to configure
		// codecRegistries, connection strings, and more
		MongoClientSettings settings = MongoClientSettings.builder().codecRegistry(pojoCodecRegistry)
				.applyConnectionString(mongoUri).build();

		MongoClient mongoClient = null;
		try {
			mongoClient = MongoClients.create(settings);
		} catch (MongoException me) {
			System.err.println("Unable to connect to the MongoDB instance due to an error: " + me);
			// System.exit(1);
		}
		return mongoClient;
	}

}
