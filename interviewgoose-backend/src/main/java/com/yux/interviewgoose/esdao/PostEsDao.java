package com.yux.interviewgoose.esdao;

import com.yux.interviewgoose.model.dto.post.PostEsDTO;
import java.util.List;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Post ES DAO
 *
 * @author Hu
 */
public interface PostEsDao extends ElasticsearchRepository<PostEsDTO, Long> {

    List<PostEsDTO> findByUserId(Long userId);
}