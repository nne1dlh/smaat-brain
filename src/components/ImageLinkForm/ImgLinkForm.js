import React from 'react';
import './ImgLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className='f3'>
				{'This Magic Brain detects faces in a picture...'}
			</p>
			<div className='center'>
				<div className='pa4 form center br3 shadow-4'>		
					<input className='f4 pa2 w-70 center' type="text" onChange={onInputChange}/>
					<button 
						className='w-40 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>				
		);
}

export default ImageLinkForm;
