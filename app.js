'use strict';

const TeleBot = require('telebot');
const fs = require('fs');

const {Translate} = require('@google-cloud/translate').v2;
const projectId = '';
const translate = new Translate({ projectId });

const botToken = "2114012944:AAFb-Jr5s1PeHjPyQSSuRUhxxhb80vHSl3A";
const bot = new TeleBot(botToken);

bot.on(['/help'], async ctx => {
	return bot.sendMessage(ctx.from.id, `Help-list\n/translate [from (lang)] [to (lang)] [text]`);
});

bot.on(/^\/translate (.+) (.+)$/i, async (ctx, props) => {
	if (!props.match[1]) {
		return bot.sendMessage(ctx.from.id, `${ctx.from.first_name}, you didn't specify which language to translate into.`);
	}

	if (!props.match[2]) {
		return bot.sendMessage(ctx.from.id, `${ctx.from.first_name}, you didn't specify which text need to translate.`);
	}

	const to = props.match[1];
	const text = props.match[2];

	const translated = await translates(to, text);

	return bot.sendMessage(ctx.from.id, translated);
});

const translates = async (to, text) => {
	await translate   
    .translate(text, to)   
    .then(results => {
      return results[0]
    })   
    .catch(err => {
      console.error(err);   
    });
}

const activate_bot = consoleMessage => {
	try {
		bot.start();
		return console.log(`${consoleMessage ? consoleMessage : 'Bot started!'}`);
	} catch (error) {
		throw Error(error);
	}
}
activate_bot();