package ${packageName}.model.vo;

import cn.hutool.json.JSONUtil;
import ${packageName}.model.entity.${upperDataKey};
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * ${dataName} VO
 *
 * @author Hu
 *
 */
@Data
public class ${upperDataKey}VO implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * title
     */
    private String title;

    /**
     * content
     */
    private String content;

    /**
     * user id
     */
    private Long userId;

    /**
     * create time
     */
    private Date createTime;

    /**
     * update time
     */
    private Date updateTime;

    /**
     * tags list
     */
    private List<String> tagList;

    /**
     * details of user who created
     */
    private UserVO user;

    /**
     * Class to Object
     *
     * @param ${dataKey}VO
     * @return
     */
    public static ${upperDataKey} voToObj(${upperDataKey}VO ${dataKey}VO) {
        if (${dataKey}VO == null) {
            return null;
        }
        ${upperDataKey} ${dataKey} = new ${upperDataKey}();
        BeanUtils.copyProperties(${dataKey}VO, ${dataKey});
        List<String> tagList = ${dataKey}VO.getTagList();
        ${dataKey}.setTags(JSONUtil.toJsonStr(tagList));
        return ${dataKey};
    }

    /**
     * Object to Class
     *
     * @param ${dataKey}
     * @return
     */
    public static ${upperDataKey}VO objToVo(${upperDataKey} ${dataKey}) {
        if (${dataKey} == null) {
            return null;
        }
        ${upperDataKey}VO ${dataKey}VO = new ${upperDataKey}VO();
        BeanUtils.copyProperties(${dataKey}, ${dataKey}VO);
        ${dataKey}VO.setTagList(JSONUtil.toList(${dataKey}.getTags(), String.class));
        return ${dataKey}VO;
    }
}
