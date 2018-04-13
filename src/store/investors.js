import Vue from 'vue'
import uuidv4 from 'uuid/v4'
import * as investors from './data.json'

const state = {
	all: {},
	allIds: [],
	allMsgIds: []
}

const mutations = {
	SET_INVESTORS (state, { investors }) {
		state.all = {...state.all, [investors.id]: investors.data() } 

		state.allIds.push(investors.id)
	},

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
		let investorRef = rootState.db.collection('Cheques')

		investors.forEach(function (el) {
			investorRef.add(el)
			.then(function(docRef) {
				console.log("Document created with ID: ", docRef.id)
			})
			.catch(function(error) {
				console.error("Error adding document: ", error)
			})
		})
	
    
    // let tempstr = JSON.stringify(investData)
    // let investDataParsed = JSON.parse(tempstr, function(key, value) {
    //   switch(key) {
    //     case 'contractAmt':
    //       return Number(value)
    //       break
    //     case 'paidUpAUM':
    //       return Number(value)
    //       break
    //     case 'maturityAmt':
    //       return Number(value)
    //       break
    //     case 'payoutAmtTD':
    //       return Number(value)
    //       break
    //     case 'balance':
    //       return Number(value)
    //       break
    //     case 'maturityDate':
    //       return new Date(value)
    //       break
    //   }
    //   return value
    // }
  // )
   

		// investRef.add({
		// 	created: Date.now(),
		// 	users: ['mr_a', 'mr_c'],
		// 	messages: []
		// })
	},

	async get ({ commit, rootState }) {
		let investorsRef = rootState.db.collection('investors')
		let investors = await investorsRef.get()

		investors.forEach(investors => commit('SET_INVESTORS', { investors }))


		let contractRef = rootState.db.collection('investors').doc('2000001').collection('contracts')
		let contracts = await contractRef.get()
		console.log("Contract  ", contracts)

	}
}

export default { namespaced: true, state, mutations, actions }
