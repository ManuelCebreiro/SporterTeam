import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const Photoperfil = props => {
	const { store, actions } = useContext(Context);
	const [files, setFiles] = useState(null);
	const [image, setImage] = useState("https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200")

	const upLoadImage = (evt) => {
		evt.preventDefault();
		//usaremos esto para enviarlo al BACKEND
		console.log("Esto son los archivos", files)
		let body = new FormData();
		body.append("profile_image", files[0])
		const options = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + store.token,
			},
			body,
			method: "POST",
		}
		fetch(process.env.BACKEND_URL + "/api/upload", options)
			.then(resp => resp.json())
			.then(data => {
				console.log("Todo bien very nice men!!!", data)
				setImage(data)
			})
			.catch(error => console.error("ERRORRRR!!!", error))
	};

	const LoadImage = (evt) => {
		console.log("Esta es la imagen cargada", files)
		const options = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + store.token,
			},
			method: "GET",
		}
		fetch(process.env.BACKEND_URL + "/api/load", options)
			.then(respuestadelback =>
				respuestadelback.json())
			.then(data => {
				// if (respuestadelback.status == 200) {
				setImage(data)
				// }
			})

	};
	useEffect(() => {
		LoadImage()
	}, []);

	return (
		<div className="jumbotron">
			<h1 className="display-4">PERFIL USUARIO</h1>
			<form onSubmit={upLoadImage}>
				<div className="row">

					<input type="file" onChange={(e) => setFiles(e.target.files)} />
				</div>
				<img src={image} />

				<button >Upload</button>
				<button onClick={LoadImage}>Poner de perfil</button>
			</form>
		</div>
	);
};
