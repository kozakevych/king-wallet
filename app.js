const Telegraf = require('telegraf');
const config = require('./config');
const Wallet = require('./models')
const { Router, Markup } = Telegraf;

// const bot = new Telegraf(process.env.BOT_TOKEN)
const bot = new Telegraf(config.token)
const mongoose = require('mongoose')

const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
	Markup.callbackButton('➕', 'plus'),
	Markup.callbackButton('➖', 'minus')
]).extra();

mongoose.connect(config.database, (err) => {
	if (err) {
		console.log('Error')
	} else {
		console.log('Connected to db !')
	}
})

bot.hears('m', (ctx) => {
	ctx.telegram.sendMessage(
		ctx.from.id,
		'How changed your budget ?',
		inlineMessageRatingKeyboard
	)
});


bot.help(ctx => ctx.reply(ctx.from));


bot.hears(/\+\d/g, (ctx) => {

	let amount;
	amount = ctx.message.text
	ctx.reply(ctx.message.text)
	
});

bot.hears(/\-\d/g, (ctx) => {

	let amount;
	amount = ctx.message.text
	ctx.reply(ctx.message.text)
	// ctx.reply('🎉 Also great ! 🎉')
});

bot.start((ctx) => {
	
	let wallet = new Wallet();
	wallet.id = ctx.from.id;
	wallet.balance = 10;
	Wallet.findOne({id: ctx.from.id}, (err, existingWallet) => {
    if (existingWallet) {
			ctx.reply('wallet already created')
    } else {
			wallet.save();
			ctx.reply('wallet successfuly created')
    }
	})
	
});

bot.startPolling()        