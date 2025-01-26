const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			 user:null,
			 auth:false
		},
		actions: {
			// Use getActions to call a function within a fuction
			getLogin: async (email, password) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: email,
							password: password
						})
					})
					if (resp.ok) {
						const data = await resp.json()
						console.log(data)
						sessionStorage.setItem('token', data.token);
						return { ok: true, token: data.token };
					} else {
						console.log("Login failed:", resp.status);
						return { ok: false };
					}
				} catch (error) {
					console.log("Error during login:", error);
					return { ok: false };
				}
			},
			logOut: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/logout", {
						method: "POST",
						headers: {
							"Authorization": "Bearer " + localStorage.getItem("token")
						},
					});

					if (response.ok) {
						const result = await response.json();
						localStorage.removeItem("token")
						setStore({ user: false, auth: false })
						return true;
					} else {
						console.log("Failed to logout user:", response.status);
						return false;
					}
				} catch (error) {
					console.log("Error logout user:", error);
					return false;
				}
			},
		},
		sign_up: async (data) => {
			console.log(data)
			try {
				const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data)
				  });
				  return response.ok;
			} catch (error) {
				console.log("Error during signup:", error)
				return false;
			}
		}
	};
};

export default getState;
