/* eslint-disable */
import {axiosInstance} from './notifications/axios/axiosInstance';
import { IWelcomeMessage } from '../../utils/types/store';

const welcome = async () => {
    const response = await axiosInstance.get<IWelcomeMessage>('/');
    return response.data;
};
const welcomeService = {
    welcome
}
export default welcomeService;