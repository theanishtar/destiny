package com.davisy.entity;

import java.util.Calendar;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileEnitity {
	String intro;
	List<String> images;
	Calendar dateJoin;
	String address_fullname;
	String address_fullname_en;
	List<Object[]> listPostInterested;
}
