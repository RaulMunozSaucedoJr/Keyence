import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { db } from '../../../../../backend/firebase/firebase'
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore'

const Dashboard = () => {
	const [data, setData] = useState([])
	const usersCollectionRef = collection(db, 'data')

	function handleFileUpload(event) {
		const file = event.target.files[0]
		const reader = new FileReader()
		reader.onload = function (e) {
			const workbook = XLSX.read(e.target.result, { type: 'binary' })
			const worksheet = workbook.Sheets[workbook.SheetNames[0]]
			const sheetData = XLSX.utils.sheet_to_json(worksheet)
			setData(sheetData)
		}
		reader.readAsBinaryString(file)
	}

	function handleDataChange(event) {
		setData(JSON.parse(event.target.value))
	}

	const createUser = async () => {
		await addDoc(usersCollectionRef, { data })
	}

	const updateUser = async id => {
		const userDoc = doc(db, 'data', id)
		await updateDoc(userDoc)
	}

	const deleteUser = async id => {
		const userDoc = doc(db, 'data', id)
		await deleteDoc(userDoc)
	}

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef)
			setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
		}

		getUsers()
	}, [])

	return (
		<>
			<div className='card mt-5'>
				<div className='card-header'>
					<h1>Sube tu archivo excel aqui</h1>
				</div>
				<div className='card-body'>
					<div className='row'>
						<div className='col-12'>
							<input
								className='form-control mb-5'
								type='file'
								onChange={handleFileUpload}
							/>
						</div>
						<div className='col-12'>
							<textarea
								className='form-control'
								value={JSON.stringify(data)}
								onChange={handleDataChange}
							/>
							<small>
								Aqui se encuentra extraida la información de nuestro archivo
							</small>
						</div>
					</div>
				</div>
				<div className='card-footer'>
					<button className='form-control btn-submit' onClick={createUser}>
						Subir archivo
					</button>
				</div>
			</div>

			{data.map(data => {
				return (
					// eslint-disable-next-line react/jsx-key
					<>
						<button
							className='btn-edit'
							onClick={() => {
								updateUser(data.id)
							}}
						>
							Actualizar informacion
						</button>
						<button
							className='btn-delete'
							onClick={() => {
								deleteUser(data.id)
							}}
						>
							Borrar información
						</button>
						<div className='accordion' id='accordionExample'>
							<div className='accordion-item'>
								<h2 className='accordion-header' id='headingOne'>
									<button
										className='accordion-button'
										type='button'
										data-bs-toggle='collapse'
										data-bs-target='#collapseOne'
										aria-expanded='true'
										aria-controls='collapseOne'
									></button>
								</h2>
							</div>
							<div
								id='collapseOne'
								className='accordion-collapse collapse show'
								aria-labelledby='headingOne'
								data-bs-parent='#accordionExample'
							>
								<div className='accordion-body'>{JSON.stringify(data)}</div>
							</div>
						</div>
					</>
				)
			})}
		</>
	)
}

export default Dashboard
