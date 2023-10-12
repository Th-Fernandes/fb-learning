export default async function D() {
  // console.log('??', process.env.HOST)

//  await fetch(process.env.HOST + '/api/products', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({  
//         isAvailable: true,
//         productName: 'Alucard shield',
//         value: 1
//     })
//   })

const productsQuery = await fetch(process.env.HOST + '/api/products', { method: 'GET'});
const products = await productsQuery.json();
console.log(products)

  return (
    <h1>\sass</h1>
  ) 
}