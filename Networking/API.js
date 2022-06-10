import api from './AxiosConfig';
class APIService {
  getPosts() {
    return api.get('/posts');
  }
  getPostDetail(id) {
    return api.get('/posts/'+id);
  }
  getPostComments(id) {
    return api.get(`posts/${id}/comments`);
  }
  getUsers() {
    return api.get('/users');
  }
  getUsersAlbums(id) {
    return api.get(`users/${id}/albums`);
  }
  getUsersTodos(id) {
    return api.get(`users/${id}/todos`);
  }
  getAlbumPhotos(id) {
    return api.get(`albums/${id}/photos`);
  }
}

export default new APIService();