export default function ({ store, redirect, error }) {
    // if (!store.state.loginInfo.username) {
    //   error({
    //     message: 'Please login first',
    //     statusCode: 777
    //   })
    // }

    console.log(store.state);

    if (store.state.loginInfo == null) {
      return redirect('/login');
    }
  }
  