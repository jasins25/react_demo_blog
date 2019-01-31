import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostAndUsers = () => async (dispatch, getState) => {
	console.log('About to fetch posts');
	await dispatch(fetchPosts());
	// const userIds = _.uniq(_.map(getState().posts, 'userId'));
	// userIds.forEach(id => dispatch(fetchUser(id)));

	_.chain(getState().posts)
		.map('userId')
		.uniq()
		.forEach(id => dispatch(fetchUser(id)))
		.value();
	// console.log(userIds);
	// async await syntax does not work with foreach statement
	// await Promise.all(userIds.map(id => dispatch(fetchUser(id))));

}

export const fetchPosts = () => async dispatch => {
	const response = await jsonPlaceholder.get('/posts');

	dispatch({ type: 'FETCH_POSTS', payload: response.data });
};


export const fetchUser = id => async dispatch => {
	const response = await jsonPlaceholder.get(`/users/${id}`);
	// console.log(response.data);
	dispatch({ type: 'FETCH_USER', payload: response.data });
}


//_.memoize works
/*export const fetchUser = id =>  dispatch => _fetchUser(id, dispatch);

const _fetchUser = _.memoize(async(id, dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${id}`);
	// console.log(response.data);
	dispatch({ type: 'FETCH_USER', payload: response.data });
});*/

// doesn't work
/*export const fetchUser = _.memoize(function(id) {
	return async function(dispatch) {
		const response = await jsonPlaceholder.get(`/users/${id}`);
		// console.log(response.data);
		dispatch({ type: 'FETCH_USER', payload: response.data });
	};
});*/

// doesn't work
/*export const fetchUser = function(id) {
	return _.memoize(async function(dispatch) {
		const response = await jsonPlaceholder.get(`/users/${id}`);
		// console.log(response.data);
		dispatch({ type: 'FETCH_USER', payload: response.data });
	});
};*/

