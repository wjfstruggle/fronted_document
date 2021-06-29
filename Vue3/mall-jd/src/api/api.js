import httpService from '@/utils/HttpService';
import HttpServiceToJson from '@/utils/HttpServiceToJson';
import axios from 'axios';
import {
  setStore,
  getStore,
  removeStore
} from '@/utils/LocalstorageUtil.js';
export default {
  queryBannersByPosition(data) {
    return HttpServiceToJson({
      url: '/api/marketing/adBanner/queryBannersByPosition',
      method: 'post',
      data: data
    });
  }
}