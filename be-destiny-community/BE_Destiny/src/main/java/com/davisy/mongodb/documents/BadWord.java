package com.davisy.mongodb.documents;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.bson.types.ObjectId;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BadWord {
	
	@Id
	private ObjectId id;
	private String name; // tên
	private int label = 1; // nhãn
	private int severityLevel = 1; // mức độ nghiêm trọng
	private Date createDate = new Date(); // này tạo
	
	public String getFormatDate() {
		
		return new SimpleDateFormat("dd-MM-yyyy").format(this.getCreateDate());
	}

//	@Override
//	public String toString() {
//		final StringBuffer sb = new StringBuffer("Recipe{");
//		sb.append(", name=").append(name);
//		sb.append(", label=").append(label);
//		sb.append('}');
//		return sb.toString();
//	}
}
