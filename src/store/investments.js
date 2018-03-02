import Vue from 'vue'
import uuidv4 from 'uuid/v4'

const state = {
	all: {},
	allIds: [],
	allMsgIds: []
}

const mutations = {
	SET_INVESTMENT (state, { investment }) {
		const data = investment.data()
		state.all = {...state.all, [investment.id]: { investor: data.investor, created: data.created, contracts: data.contracts }} 

		state.allIds.push(investment.id)
	},

	ADD_MESSAGE (state, { conversationId, message }) {
		if (!state.allMsgIds.includes(message.id)) {
			state.all[conversationId].messages.push(message)
			state.allMsgIds.push(message.id)
		}
	},
}

const actions = {
	sendMessage ({ commit, rootState }, { text, created, sender, conversationId }) {
		const convoRef = rootState.db.collection('conversations').doc(conversationId)

		convoRef.update({
			messages: [...state.all[conversationId].messages, { id: uuidv4(), created, sender, text }]
		})
		.then(res => console.log('Message sent.'))
		.catch(err => console.log('Error', err))
	},
	
	seed ({ rootState }) {
    let investRef = rootState.db.collection('investments')
    
    let investData = {
			created: Date.now(),
      investor: 'Lara Croft',
      contracts: [
        {
          "InvestorID": "1",
          "Contract": "2000004210",
          "investor": " Kanchana Selvakumar",
          "name": "Platinum 18",
          "contractAmt": "10000",
          "paidUpAUM": "10000",
          "maturityAmt": "12700",
          "payoutAmtTD": "5000",
          "balance": "7700",
          "maturityDate": "11/14/17",
          "status": "Active"
      },
      {
          "InvestorID": "2",
          "Contract": "2000005036",
          "investor": "A Radha",
          "name": "Gold 48 Series 2",
          "contractAmt": "8000",
          "paidUpAUM": "364",
          "maturityAmt": "509.6",
          "payoutAmtTD": "0",
          "balance": "509.6",
          "maturityDate": "1/14/21",
          "status": "Active"
      },
      {
          "InvestorID": "7",
          "Contract": "2000001755",
          "investor": "Abdul Aziz Bin Haja Maideen",
          "name": "Titanium 60 Series 2",
          "contractAmt": "6000",
          "paidUpAUM": "6000",
          "maturityAmt": "6210",
          "payoutAmtTD": "3000",
          "balance": "3210",
          "maturityDate": "9/14/19",
          "status": "Active"
      },
      {
          "InvestorID": "8",
          "Contract": "2000005260",
          "investor": "Abdul Karim S/O Shahul Hameed",
          "name": "Titanium 60 Series 3",
          "contractAmt": "20000",
          "paidUpAUM": "20000",
          "maturityAmt": "20700",
          "payoutAmtTD": "2300",
          "balance": "18400",
          "maturityDate": "3/14/22",
          "status": "Active"
      },
      {
          "InvestorID": "9",
          "Contract": "2000000352",
          "investor": "Aishini d/o Sailan",
          "name": "Gold 60",
          "contractAmt": "4000",
          "paidUpAUM": "348",
          "maturityAmt": "414.99",
          "payoutAmtTD": "0",
          "balance": "414.99",
          "maturityDate": "3/14/18",
          "status": "Active"
      },
      {
          "InvestorID": "10",
          "Contract": "2000005118",
          "investor": "Andalib Rusdi Danial Karim",
          "name": "Supreme 9",
          "contractAmt": "15000",
          "paidUpAUM": "15000",
          "maturityAmt": "16800",
          "payoutAmtTD": "3450",
          "balance": "13350",
          "maturityDate": "10/31/17",
          "status": "Active"
      },
      {
          "InvestorID": "11",
          "Contract": "2000000170",
          "investor": "Arul S/O Vadamalai",
          "name": "Platinum 60",
          "contractAmt": "10000",
          "paidUpAUM": "10000",
          "maturityAmt": "16000",
          "payoutAmtTD": "2000",
          "balance": "14000",
          "maturityDate": "7/31/17",
          "status": "Active"
      },
      {
          "InvestorID": "12",
          "Contract": "2000004576",
          "investor": "Christopher Thomas",
          "name": "Supreme 6",
          "contractAmt": "20000",
          "paidUpAUM": "20000",
          "maturityAmt": "22400",
          "payoutAmtTD": "3000",
          "balance": "19400",
          "maturityDate": "1/31/17",
          "status": "Active"
      },
      {
          "InvestorID": "13",
          "Contract": "2000004699",
          "investor": "Daniel Angeline Rani",
          "name": "Elite 6-30",
          "contractAmt": "60000",
          "paidUpAUM": "4000",
          "maturityAmt": "5200",
          "payoutAmtTD": "2000",
          "balance": "3200",
          "maturityDate": "3/14/17",
          "status": "Active"
      },
      {
          "InvestorID": "14",
          "Contract": "2000000007",
          "investor": "Kalarani D/O Narayanan",
          "name": "Profit On Jai Maruthi Tranche 3",
          "contractAmt": "24000",
          "paidUpAUM": "24000",
          "maturityAmt": "38400",
          "payoutAmtTD": "2300",
          "balance": "36100",
          "maturityDate": "5/31/14",
          "status": "Active"
      },
      {
          "Contract": "2000005276",
          "investor": "Parie S/O T Krishnan",
          "name": "Elite 6",
          "contractAmt": "50000",
          "paidUpAUM": "59000",
          "maturityAmt": "69620",
          "payoutAmtTD": "23000",
          "balance": "46620",
          "maturityDate": "7/31/17",
          "status": "Active"
      },
      {
          "Contract": "2000005334",
          "investor": "Povaneswari D/O Shanmugam",
          "name": "Elite 8",
          "contractAmt": "50000",
          "paidUpAUM": "50000",
          "maturityAmt": "62500",
          "payoutAmtTD": "3450",
          "balance": "59050",
          "maturityDate": "10/14/17",
          "status": "Active"
      },
      {
          "Contract": "2000000348",
          "investor": "Sanmugapriya d/o Tharmapala",
          "name": "Gold 48",
          "contractAmt": "3000",
          "paidUpAUM": "510",
          "maturityAmt": "589.15",
          "payoutAmtTD": "240",
          "balance": "349.15",
          "maturityDate": "3/14/17",
          "status": "Active"
      },
      {
          "Contract": "2000002574",
          "investor": "Shylaja D/O P Govindan Kutti Nair",
          "name": "Titanium 36",
          "contractAmt": "42000",
          "paidUpAUM": "42000",
          "maturityAmt": "43680",
          "payoutAmtTD": "23402",
          "balance": "20278",
          "maturityDate": "6/14/18",
          "status": "Active"
      },
      {
          "Contract": "2000005458",
          "investor": "Uthay Kumaran S/O K Appavoo",
          "name": "Titanium 6",
          "contractAmt": "440000",
          "paidUpAUM": "440000",
          "maturityAmt": "572000",
          "payoutAmtTD": "23456",
          "balance": "548544",
          "maturityDate": "10/1/17",
          "status": "Active"
      },
      {
          "Contract": "2000005456",
          "investor": "Yusuf Chong",
          "name": "Platinum 48 S",
          "contractAmt": "3250000",
          "paidUpAUM": "3250000",
          "maturityAmt": "5850000",
          "payoutAmtTD": "5850000",
          "balance": "0",
          "maturityDate": "6/14/21",
          "status": "Fully Settled"
      }
			]
    }
    
    let tempstr = JSON.stringify(investData)
    let investDataParsed = JSON.parse(tempstr, function(key, value) {
      switch(key) {
        case 'contractAmt':
          return Number(value)
          break
        case 'paidUpAUM':
          return Number(value)
          break
        case 'maturityAmt':
          return Number(value)
          break
        case 'payoutAmtTD':
          return Number(value)
          break
        case 'balance':
          return Number(value)
          break
        case 'maturityDate':
          return new Date(value)
          break
      }
      return value
    }
  )
    console.log("parsed data: ", investDataParsed)
   
		investRef.add(investDataParsed)

		// investRef.add({
		// 	created: Date.now(),
		// 	users: ['mr_a', 'mr_c'],
		// 	messages: []
		// })
	},

	async get ({ commit, rootState }) {
		let investRef = rootState.db.collection('investments')
		let invests = await investRef.get()

		invests.forEach(investment => commit('SET_INVESTMENT', { investment }))
	}
}

export default { namespaced: true, state, mutations, actions }
