import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "/workspace/SporterTeam/src/front/styles/photoperfil.css"
// import cloudinary from "cloudinary/lib/cloudinary";


export const Photoperfil = props => {
	const { store, actions } = useContext(Context);
	const [files, setFiles] = useState(null);
	const [image, setImage] = useState("https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200")
	const [respuesta, setRespuesta] = useState("");


	const upLoadImage = (evt) => {
		evt.preventDefault();
		//usaremos esto para enviarlo al BACKEND
		console.log("Esto son los archivos", files)
		let body = new FormData();
		body.append("profile_image", files[0])
		const options = {
			body,
			method: "POST",
			headers: {
				"Authorization": "Bearer " + store.token,
			},
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
				setImage(data)
				actions.traermeimagen(data)
				setRespuesta("")
			})

	};
	useEffect(() => {
		LoadImage()
	}, []);

	// const Borrar = () => {
	// 	var cloudinary = require('cloudinary').v2;
	// 	cloudinary.config({
	// 		cloud_name: 'xx',
	// 		api_key: 'xx',
	// 		api_secret: 'xx'
	// 	});
	// 	cloudinary.uploader.destroy('sample', function (result) { console.log(result) });
	// }

	const deleteImage = () => {
		setImage("https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200")
		setRespuesta("Esta es la imagen predefinida, si quieres poner la tuya, carga tu foto")
	}

	// const deleteImage = async (e) => {
	// 	e.preventDefault();
	// 	cloudinary.v2.uploader.destroy(imageData.public_id, function (error, result) {
	// 		console.log(result, error)
	// 	})
	// 		.then(resp => console.log(resp))
	// 		.catch(_err => console.log("Something went wrong, please try again later."));
	// }
	return (
		<div className="jumbotron">
			<h1 className="display-4">PERFIL USUARIO</h1>
			<form onSubmit={upLoadImage}>
				<div className="row">

					<img src={image} style={{ width: 200 }} />
					<p><strong>{respuesta}</strong></p>
					<input type="file" onChange={(e) => setFiles(e.target.files)} />
				</div>
				<button onClick={LoadImage}>Cargar</button>
				<button onClick={deleteImage}>Borrar</button>


				{/* <button >Poner de perfil</button> */}
			</form>
		</div>
	);

};
