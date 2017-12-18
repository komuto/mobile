import * as actions from '../actions/stores'
import * as apis from '../api/stores'
import { buildSaga, buildSagaDelay } from '../config'

export const getStores = buildSaga(apis.getStores, actions.GET_STORE)
export const createStore = buildSaga(apis.createStore, actions.CREATE_STORE)
export const storeExpeditionList = buildSaga(apis.storeExpeditionList, actions.STORE_EXPEDITION_LIST)
export const storeExpeditionManage = buildSaga(apis.storeExpeditionManage, actions.STORE_EXPEDITION_MANAGE)
export const photoUpload = buildSaga(apis.photoUpload, actions.PHOTO_UPLOAD)
export const verifyStore = buildSaga(apis.verifyStore, actions.VERIFY_STORE)
export const sendMessageStore = buildSaga(apis.sendMessageStore, actions.MESSAGE_STORE)
export const getOwnStore = buildSaga(apis.getOwnStore, actions.GET_OWN_STORE)
export const getStoreProducts = buildSaga(apis.getStoreProducts, actions.GET_STORE_PRODUCTS)
export const getStoreCatalogProducts = buildSaga(apis.getStoreCatalogProducts, actions.GET_STORE_CATALOG_PRODUCTS)
export const updateInformation = buildSaga(apis.updateInformation, actions.UPDATE_INFORMATION)
export const updateTerm = buildSaga(apis.updateTerm, actions.UPDATE_TERM)
export const getStoreAddress = buildSaga(apis.getStoreAddress, actions.GET_ADDRESS)
export const updateStoreAddress = buildSaga(apis.updateStoreAddress, actions.UPDATE_STORE_ADDRESS)
export const getHiddenStoreProducts = buildSaga(apis.getHiddenStoreProducts, actions.GET_HIDDEN_STORE_PRODUCTS)
export const getStoreDiscussions = buildSaga(apis.getStoreDiscussions, actions.GET_STORE_DISCUSSIONS)
export const getStoreProductDetail = buildSaga(apis.getStoreProductDetail, actions.GET_STORE_PRODUCT_DETAIL)
export const getStoreProductsByCatalog = buildSaga(apis.getStoreProductsByCatalog, actions.GET_STORE_PRODUCTS_BY_CATALOG)
export const getUnreadDisputesStore = buildSaga(apis.getUnreadDisputeStore, actions.UNREAD_DISPUTES_STORE)
export const getStoreProductsByCatalogSearch = buildSagaDelay(apis.getStoreProductsByCatalogSearch, actions.GET_STORE_PRODUCTS_BY_CATALOG_SEARCH)
export const getStoreProductsHiddenByCatalogSearch = buildSagaDelay(apis.getStoreProductsHiddenByCatalogSearch, actions.GET_STORE_PRODUCTS_HIDDEN_BY_CATALOG_SEARCH)
export const getDropshipFaq = buildSaga(apis.getDropshipperFaq, actions.GET_DROPSHIPPER_FAQ)
