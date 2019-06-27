function getUrlVars()
{
  let result = {}, hash;
  let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(let i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');

    result[hash[0]] = hash[1];
  }
  return result;
}

let params = getUrlVars()
let tokenId = params.tokenId.replace('#', '')
console.log(tokenId)
$(document).ready(async function () {

  const abi = await $.getJSON('./abi.json')
  const web3 = await new Web3(await new Web3.providers.HttpProvider('https://rpc.tomochain.com'))
  const contract = await new web3.eth.Contract(abi, '0xd432ff87e9f6bf8aace8866ed351435ebdd1ec00')

  try {
    let certificateInfo = await contract.methods.viewcert(tokenId).call()
    $('.username').html(certificateInfo.name)
    $('.certificate').html(certificateInfo.course)
    $('.score').html(certificateInfo.grade)
    $('.status').html(certificateInfo.status)
    $('.userId').html(certificateInfo.tomoAddress)
    $('.certificateId').html(tokenId)

    let dateIssued = certificateInfo.dateIssued
    let date = new Date(`2019-${dateIssued.substr(2,3)}-${dateIssued.substr(0,2)}`)

    const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let formatted_date = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    $('.completeDate').html(formatted_date)

    $('footer').removeClass('d-none').addClass('d-block')
    $('.main-content').removeClass('d-none').addClass('d-block')
    $('.main-error-404').removeClass('d-block').addClass('d-none')
  } catch (e) {
    $('footer').removeClass('d-block').addClass('d-none')
    $('.main-content').removeClass('d-block').addClass('d-none')
    $('.main-error-404').removeClass('d-none').addClass('d-block')
  }

})

function changeLanguage(lang) {
  if (lang === 'vi') {
    window.location = 'index-vi.html?tokenId=' + tokenId
  } else {
    console.log(123)
    window.location = 'index.html?tokenId=' + tokenId
  }
}
