import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery'
import { graphql } from "gatsby"

import Img from "gatsby-image"
import Link from '../components/Link.js'
import bballImg from '../images/bball.png'
import atitlanImg from '../images/atitlan.jpg'

import './index.css'

const IndexPage = () => {
	const [offset, setOffset] = useState(0)
	const [paletteColors, setPaletteColors] = useState([])
	const [tooltipMessage, setTooltipMessage] = useState('copy to clipboard')

	const emailRef = useRef()

	useEffect(() => {
		generateColors()

		setTimeout(() => {
			displayAtitlanBackground()
		}, 2000)

		setTimeout(() => {
			blinkingText()
		}, 6000)

		$(window).scroll(() => {
			anchorLinks()
			updatePageOffset()
		})
	}, [])

	const displayAtitlanBackground = () => {
		$('.name-section').addClass('name-section-atitlan-bg')
		$('.name-section-atitlan-bg').css({'background-image': `url(${atitlanImg})`})
		$('.links').removeClass('hidden')
	}

	const anchorLinks = () =>
		$(window).scrollTop() > window.innerHeight * 0.9 && window.innerWidth > 970
			? $('.links').addClass('anchor-links')
			: $('.links').removeClass('anchor-links')

	const updatePageOffset = () => setOffset(window.pageYOffset)

	const blinkingText = () => {
		$('.chateaU').addClass('blink')

		setTimeout(() => {
			$('.chateaU').removeClass('blink')
		}, 900)
		setTimeout(() => {
			blinkingText()
		}, 1600)
	}

	const handleEmailClick = () => {
		$('.e-mail-wrapper, .e-mail').addClass('e-mail-clicked')
		copyToClipboard()
	}

	const handleContactMouseLeave = () => {
		$('.e-mail-wrapper, .e-mail').removeClass('e-mail-clicked')
		setTooltipMessage('copy to clipboard')
	}

	const copyToClipboard = () => {
		const copyText = emailRef.current

		copyText.select()
		document.execCommand('copy')

		setTooltipMessage('you did it!')
	}

	const generateColors = () => {
		let colors = []

		while (colors.length < 5) {
			colors.push(generateRandomHexCode())
		}
		setPaletteColors(colors)

		setTimeout(() => {
			generateColors()
		}, 4000)
	}

	const generateRandomHexCode = () => {
		let hexCode = '#'

		while (hexCode.length < 7) {
			hexCode += generateRandomHexValue()
		}
		return hexCode
	}

	const generateRandomHexValue = () => {
		const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
		const randomIndex = Math.floor(Math.random() * 16)
		return values[randomIndex]
	}

	const generatePalette = () => {
		const palette = []

		for (let i = 1; i <= 5; i++) {
			const color = paletteColors[i - 1]
			palette.push(
				<section
					className={`proj-pp-color-${i} color`}
					style={{ background: color }}
					key={color || i}
				/>
			)
		}
		return palette
	}

	return (
		<div className='App'>
			<section
				className='name-section'
				style={{
					backgroundPositionY: offset / 1.8
				}}
			>
				<nav className='links hidden'>
					<Link
						href='github.com/christopherchateau'
						linkClasses={['fab', 'slide', 'fa-github']}
					/>
					<Link
						href='linkedin.com/in/christopherchateau/'
						linkClasses={['fab', 'slide', 'fa-linkedin']}
					/>
					<Link
						href='open.spotify.com/user/22sqnzcvx3svvhpsxhlzodhji?si=qtjIs9klT-erRFdTIQR4TA'
						linkClasses={['fab', 'slide', 'fa-spotify']}
					/>
				</nav>
				<div
					className='name'
					style={{
						bottom: offset / 3,
						opacity: 0.6 - offset * 0.001
					}}
				>
					<h1>chris</h1>
					<h1>
						chatea<span className='chateaU'>u</span>
					</h1>
				</div>
			</section>
			<section className='proj-section'>
				<article className='proj-title'>
					<h2>projects</h2>
				</article>
				<div className='proj-wrapper'>
					<Link
						href='github.com/christopherchateau/long-shot-league'
						linkClasses={['proj-long-shot-league', 'proj']}
					>
						<p className='proj-long-shot-league-update'>
							updated in 2020
						</p>
						<h4>
							LONG SH
							<img className='bball-img' src={bballImg} alt='O' />
							T LEAGUE
						</h4>
						<span className='proj-hover-text'>
							reactJS - express - knex - postgreSQL
						</span>
					</Link>
					<Link
						href='github.com/christopherchateau/summit-register-FE'
						linkClasses={['proj-summit-register', 'proj']}
					>
						<h4>summit register</h4>
						<span className='proj-hover-text'>
							reactJS
							<i className='fab fa-react' />
						</span>
					</Link>
					<Link
						href='github.com/christopherchateau/marvelous'
						linkClasses={['proj-marvelous', 'proj']}
					>
						<h4>MARVELOUS</h4>
						<span className='proj-hover-text'>
							reactJS - react router - redux
						</span>
					</Link>
					<Link
						href='github.com/christopherchateau/BuildYourOwnBackend'
						linkClasses={['proj-byobe', 'proj']}
					>
						<p>Cerebral Brewing API</p>
						<span className='proj-hover-text'>
							javascript - express - knex - postgreSQL
						</span>
					</Link>
					<Link
						href='github.com/christopherchateau/movie-tracker'
						linkClasses={['proj-cc', 'proj']}
					>
						<h4 className='cc-title'>coenCollection</h4>
						<span className='proj-hover-text'>
							reactJS - react router - redux
						</span>
					</Link>
					<Link
						href='github.com/christopherchateau/palette-picker'
						linkClasses={['proj-pp']}
					>
						<div className='proj-pp-colors-wrapper proj'>
							<h3 className='pp-title'>palette picker</h3>
							<span className='proj-hover-text'>
								jQuery - express - knex - postgreSQL
							</span>
							{generatePalette()}
						</div>
					</Link>
					<Link
						href='github.com/christopherchateau/headcount2.0'
						linkClasses={['proj-headcount', 'proj']}
					>
						<h4>HEADCOUNT</h4>
						<span className='proj-hover-text'>
							reactJS
							<i className='fab fa-react' />
						</span>
					</Link>
					<Link
						href='github.com/christopherchateau/SWAPI-Box'
						linkClasses={['proj-swapi-box', 'proj']}
					>
						<h4>SWAPi-Box $</h4>
						<span className='proj-hover-text'>
							reactJS - react router
						</span>
					</Link>
					<Link
						href='github.com/christopherchateau/space-bunny'
						linkClasses={['proj-space-bunny', 'proj']}
					>
						<h4>SPACE BUNNY</h4>
						<span className='proj-hover-text'>
							javascript - html canvas
						</span>
					</Link>
				</div>
				<article className='challenges-title'>
					<h2>code challenges</h2>
				</article>
				<div className='challenges-wrapper'>
					<Link
						href='exercism.io/profiles/christopherchateau'
						linkClasses={['challenge-exercism', 'challenge']}
					/>

					<Link
						href='www.codewars.com/users/christopherchateau'
						linkClasses={['challenge-cw', 'challenge']}
					>
						<div className='challenge-cw-interior'>
							<h4>code wars</h4>
							<img
								className='cw-banner'
								src='https://www.codewars.com/users/christopherchateau/badges/micro'
								alt='code wars'
							/>
						</div>
					</Link>
				</div>
			</section>
			<section className='me-section'>
				<div className='headshot'>
					<h4 className='me-text'>
						cycling
						<br />
						snowboarding
						<br />
						coding
						<br />
					</h4>
				</div>
				<div className='spotify'>
					<header>currently in rotation</header>
					<section className='spotify-playlists'>
						<Link
							href='open.spotify.com/playlist/37i9dQZF1DXbrNmKPI2OlG'
							linkClasses={['playlist', 'playlist-1']}
						/>
						<Link
							href='open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS'
							linkClasses={['playlist', 'playlist-2']}
						/>
						<Link
							href='open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT'
							linkClasses={['playlist', 'playlist-3']}
						/>
						<Link
							href='open.spotify.com/album/6oRuinkJdTge4hpTuClEF8'
							linkClasses={['playlist', 'playlist-4']}
						/>
						<Link
							href='open.spotify.com/album/4anxEzh8xEKSPXKHGWiFue'
							linkClasses={['playlist', 'playlist-5']}
						/>
						<Link
							href='open.spotify.com/album/0YF8PfcGbsKg5IaFyPnlyY'
							linkClasses={['playlist', 'playlist-6']}
						/>
					</section>
				</div>
				<div
					className='contact'
					onMouseLeave={handleContactMouseLeave}
					onClick={handleEmailClick}
				>
					<span className='tooltip-text'>{tooltipMessage}</span>
					<div className='e-mail-wrapper'>
						<i className='fas fa-envelope' />
						<input
							className='e-mail'
							ref={emailRef}
							type='text'
							value='christopherchateau@gmail.com'
						/>
					</div>
				</div>
			</section>
		</div>
	)
}

export default IndexPage
