const { Telegraf, Markup } = require('telegraf')
const text = require('./const')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Hello ${ctx.message.from.first_name ? ctx.message.from.first_name : "anyone"}!`))
bot.help((ctx) => ctx.reply(text.commands))
bot.command('courses',async ctx => {
    try {
        await ctx.replyWithHTML('<b>Courses</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Computer IT', 'btn_1'), Markup.button.callback('Html/Css', 'btn_2')],
                [Markup.button.callback('JS', 'btn_3')]
            ]
        ))
    } catch (error) {
        console.log(error);
    }
})

function addAction(name, src, text) {
    bot.action(name, async ctx => {
        try {
            await ctx.answerCbQuery()
            if(src !== false){
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (error) {
            console.log(error);
        }
    })
}

addAction('btn_1', false , text.text)
addAction('btn_2', false , text.text)
addAction('btn_3', false , text.text)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))