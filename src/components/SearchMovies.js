import React, {useEffect, useRef, useState} from 'react';

/* import noPoster from '../assets/images/no-poster.jpg'; */

function SearchMovies(){
	const form = useRef(true)
	const input = useRef(true)
	
	const [movies,setMovies] = useState(
		{
			array : [],
			keyword : "Behind the Scenes: Last Action Hero"
		}
	)

	// Credenciales de API
	const apiKey = '79077a53'; // Intenta poner cualquier cosa antes para probar

	useEffect(()=>{
		fetch(`http://www.omdbapi.com/?s=${movies.keyword}&apikey=${apiKey}`)
		.then(response => response.json())
		.then(movieFound => { 
			if(movieFound.Response == "True"){
				console.log("seteo peli")
				setMovies( {
					...movies,
					array: movieFound.Search
				} )
			}else{
				setMovies( {
					array : [],
					keyword: ""
				} )
			}
		})
	},[movies.keyword])


	const buscar = (e)=>{
		e.preventDefault()
		setMovies({
            ...movies,
			keyword : input.current.value,
        })
		console.log(movies)
	}

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form ref={form} onSubmit={buscar} method="GET">
								<div className="form-group">
									<label htmlFor="search">Buscar por título:</label>
									<input ref={input} type="text" className="form-control" name="search"/>
								</div>
								<button className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {input.current.value}</h2>
						</div>
						{/* Listado de películas */}
						{ movies.array.length > 0 && movies.array.map((movie, i) => {
							return (
									<div className="col-sm-6 col-md-3 my-4" key={movie.Title + i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Title}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
						{ movies.array.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;
