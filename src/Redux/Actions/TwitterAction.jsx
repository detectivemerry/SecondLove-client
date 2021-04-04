export const fetchPosts = () => dispatch => {
    fetch('https://breadplaza.com/api/public/index.php/api/ntusg')
        .then(res => res.json())
        .then(data => dispatch({
            type: 'FETCH_POST',
            payload: data
        })
        );
}
