import Vue from 'vue'
import uuidv4 from 'uuid/v4'

const state = {
	all: {},
	allIds: [],
	allMsgIds: []
}

const mutations = {
	SET_CONTRACT (state, { contract }) {
    const data = contract.data()
    console.log("SET CONTRACT...", data)
		state.all = {
      ...state.all, 
      [data.contractNo]: { investor: data.investor, created: data.created, contracts:[] }} 

		state.allIds.push(contract.contractNo)
	}

	// ADD_MESSAGE (state, { conversationId, message }) {
	// 	if (!state.allMsgIds.includes(message.id)) {
	// 		state.all[conversationId].messages.push(message)
	// 		state.allMsgIds.push(message.id)
	// 	}
	// },
}

const actions = {
	// sendMessage ({ commit, rootState }, { text, created, sender, conversationId }) {
	// 	const convoRef = rootState.db.collection('conversations').doc(conversationId)

	// 	convoRef.update({
	// 		messages: [...state.all[conversationId].messages, { id: uuidv4(), created, sender, text }]
	// 	})
	// 	.then(res => console.log('Message sent.'))
	// 	.catch(err => console.log('Error', err))
	// },
	
	seed ({ rootState }) {
		let contractsRef = rootState.db.collection('contracts')

		contractsRef.add({
			created: Date.now(),
			investor: 'Lara Croft',
			contracts: [
        { 
          name: 'Titanium 60 Series 2',
          contractNo: '200000012',
          contractAmt: 6000,
          paidUpAmt: 6000,
          maturityAmt: 7500, 
          payoutAmtTD: 4000, 
          balance: 3500, 
          maturityDate: new Date('4/23/2018'),
          status: 'Active'
        },
        {
          value: false,
          name: 'Titanium 60 Series 2',
          contractNo: '200000013',
          contractAmt: 10000,
          paidUpAmt: 10000,
          maturityAmt: 12500,
          payoutAmtTD: 6000,
          balance: 6500,
          maturityDate: new Date('8/23/2018'),
          status: 'Active'
        },
        {
          value: false,
          name: 'Platinum 18',
          contractNo: '200000015',
          contractAmt: 10000, 
          paidUpAmt: 10000, 
          maturityAmt: 18000, 
          payoutAmtTD: 18000, 
          balance: 0, 
          maturityDate: new Date('1/14/2018'),
          status: 'Fully Settled'
        }
			]
		})

		// convoRef.add({
		// 	created: Date.now(),
		// 	users: ['mr_a', 'mr_c'],
		// 	messages: []
		// })
	},

	async get ({ commit, rootState }) {
		let contractsRef = rootState.db.collection('contracts')
		let contracts = await contractsRef.get()

    contracts.forEach(contract => commit('SET_CONTRACT', { contract }))
    // contracts.forEach(contract => console.log("GET CONTRACT", contract.data().investor))
    // console.log("GET Contracts", contracts)
	}
}

export default { namespaced: true, state, mutations, actions }
