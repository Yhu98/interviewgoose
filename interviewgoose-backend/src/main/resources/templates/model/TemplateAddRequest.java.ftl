package ${packageName}.model.dto.${dataKey};

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * create ${dataName} request
 *
 * @author Hu
 *
 */
@Data
public class ${upperDataKey}AddRequest implements Serializable {

    /**
     * title
     */
    private String title;

    /**
     * content
     */
    private String content;

    /**
     * tags
     */
    private List<String> tags;

    private static final long serialVersionUID = 1L;
}