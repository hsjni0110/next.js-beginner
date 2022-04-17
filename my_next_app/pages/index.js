import Seo from '../components/Seo';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function Home({results}){
	const router = useRouter();
	const onClick = (id, title) => {
		router.push(`/movies/${title}/${id}`)
	};
	return(
		<div className="container">
			<Seo title="Home" />
			{results?.map((movie) => (
				<div
					onClick={() => onClick(movie.id, movie.original_title)}
					className="movie"
					key={movie.id}
					>
					<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
					<h4>
						<Link href={`/movies/${movie.original_title}/${movie.id}`}>
							<a>{movie.original_title}</a>
						</Link>
					</h4>
				</div>
			))}
			<style jsx>{`
				.container {
					display: grid;
					grid-template-columns: repeat(2,1fr);
					padding: 20px;
					gap: 20px;
				}
				.movie img{
					max-width: 100%;
					border-radius: 12px;
					trasition: transform 0.2s ease-in-out;
					box-shadow: rgba(0,0,0,0.1) 0px 4px 12px;
		
				}
				.movie {
					cursor: pointer;
				}
				.movie:hover img{
					transform: scale(1.05) translateY(-10px);
				}
				.movie h4{
					font-size: 18px;
					text-align: center;
				}
			`}</style>
		</div>
	)
}

export async function getServerSideProps(){
	const { results } = await (
		await fetch(`https://next-js-beginner-qstzb.run.goorm.io/api/movies`)
	).json();
	return{
		props:{
			results,
		},
	}
}