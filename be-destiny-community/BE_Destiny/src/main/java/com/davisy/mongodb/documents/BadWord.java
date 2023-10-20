package com.davisy.mongodb.documents;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BadWord{
	
	 public String name;	//tên
	 public int label = 1;		//nhãn
	 public int severityLevel = 1 ;	// mức độ nghiêm trọng
	 public Date createDate = new Date();	//này tạo

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Recipe{");
        sb.append(", name=").append(name);
        sb.append(", label=").append(label);
        sb.append('}');
        return sb.toString();
    }
}
