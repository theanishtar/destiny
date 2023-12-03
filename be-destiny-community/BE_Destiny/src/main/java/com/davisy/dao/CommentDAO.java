package com.davisy.dao;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.davisy.entity.Comment;
import com.davisy.entity.CommentEntity;

import jakarta.transaction.Transactional;

//@Cacheable("comment")//Tạo bộ nhớ đệm
@Repository
@Transactional
public interface CommentDAO extends JpaRepository<Comment, Integer> {

	// 23-9-2023 -lấy tất cả bình luận của bài đăng
	@Query(value = "SELECT  * FROM comment WHERE post_id =:id", nativeQuery = true)
	public List<Comment> getListCommentByPostID(int id);

	// 23-9-2023 -lấy tổng bình luận của bài đăng
//	@Cacheable("comment")
	@Query(value = "SELECT  COUNT(comment_id) FROM comment WHERE post_id =:id", nativeQuery = true)
	public int totalCommentByPost(int id);

	// 23-9-2023 -lấy tổng bình luận của người dùng đã bình luận
	@Query(value = "SELECT  COUNT(comment_id) FROM comment WHERE user_id =:id", nativeQuery = true)
	public int totalCommentByUser(int id);

	@Query(value = "SELECT  *FROM COMMENT WHERE parent_comment_id =:id", nativeQuery = true)
	public List<Comment> findAllByIdComment(int id);

	@Query(value = "select *from get_comment_list_with_counts(:id,:check) ORDER BY date_comment DESC", nativeQuery = true)
	public List<Object[]> findAllComment(int id, int check);

//	@Query(value = "select *from get_comment_list_with_counts(:id,:check) c WHERE c.comment_id=:commentId", nativeQuery = true)
//	public List<Object[]> findCommentId(int id, int check, int commentId);

	@Query(value = "select *from get_comment_list_with_counts(:id,:check) c WHERE c.comment_id=:commentId", nativeQuery = true)
	public Object[] findCommentId(int id, int check, int commentId);

	@Query(value = "select c.user_id from \"comment\" c where c.comment_id =:id", nativeQuery = true)
	public Integer findByIdtoUser(int id);

	@Query(value = "select c.comment_id, c.user_id ,c.parent_comment_id,c.post_id,c.date_comment,c.\"content\",c.comment_status  from  \"comment\" c where c.comment_id =:id", nativeQuery = true)
	public Object[] findByIdComment(int id);

	@Query(value = "select p.post_id,(select pi2.link_image  from post_images pi2 where pi2.post_id =p.post_id limit 1) AS link_image,u.fullname,p.\"content\",TO_CHAR( c.date_comment, 'DD-MM-YYYY'),p.user_id\r\n"
			+ "from post p  inner join \"comment\" c  on p.post_id =c.post_id inner join users u on p.user_id =u.user_id  where c.user_id =:id order by  c.date_comment  desc", nativeQuery = true)
	public List<Object[]> loadHistoryComment(int id);
	
	@Query(value = "select c.comment_id  from \"comment\" c where c.parent_comment_id =:id",nativeQuery = true)
	public List<Integer> get_parent_id(int id);

	@Modifying
	@Query(value = "delete from \"comment\" c where c.parent_comment_id=:id", nativeQuery = true)
	public void remove_parent_comment(int id);
	
	@Modifying
	@Query(value = "delete from \"comment\" c where c.comment_id=:id", nativeQuery = true)
	public void removeComment(int id);

}