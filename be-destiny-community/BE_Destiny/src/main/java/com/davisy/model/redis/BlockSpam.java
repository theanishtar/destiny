package com.davisy.model.redis;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlockSpam implements Serializable{
	Long currenTime;
	Integer countrequest;
	
	
}
