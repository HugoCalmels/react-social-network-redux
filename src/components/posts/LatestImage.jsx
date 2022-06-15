import  {useEffect} from 'react'
const LatestImage = (props) => {


  useEffect(() => {
    fetch("http://localhost:3000/api/v1/latest")
      .then(response => response.json())
      .then((data) => {
        console.log('LLATTESSTTTT-IIMMMMAAGGGEEEE')
        console.log(data)
        console.log('LLATTESSTTTT-IIMMMMAAGGGEEEE')
      })
  },[props.latestImage])

  return (
    <div className="latest-image">Latest Image</div>
  )
}

export default LatestImage