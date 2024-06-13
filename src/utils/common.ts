import { ElNotification } from 'element-plus';
import nprogress from 'nprogress';

type NotificationType =
    | ''
    | 'success'
    | 'warning'
    | 'error'
    | 'info';

export const toast = (
    message: string,
    type: NotificationType = 'success',
    dangerouslyUseHTMLString = true,
) => {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000,
    });
};

// 显示全局Loading
export const showFullLoading = () => {
    nprogress.start();
};
