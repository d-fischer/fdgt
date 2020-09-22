// Local imports
import { DOLLARBUCK_CORRELATIONS } from 'data/DOLLARBUCK_CORRELATIONS'
import { incrementStat } from 'helpers/incrementStat'





// Local constants
const { HOST } = process.env





export const defaults = {
	months: 3,
	prime: false,
	tier: 1,
}

/**
 * `resubscription` events are fired when a when a user continues their existing, non-gifted subscription.
 *
 * @alias `resubscription`
 *
 * @param {string} color - The color of the user's name in chat.
 * @param {string} messageid - The ID of the message.
 * @param {number} months=3 The number of months the user has been subscribed to the channel.
 * @param {boolean} prime=false Whether this is a Prime subscription.
 * @param {number} tier=1 - The tier of the subscription being extended.
 * @param {string} timestamp - The millisecond timestamp when the message was sent.
 * @param {string} userid - The ID of the user sending the message.
 * @param {string} username - The username of the user sending the message.
 *
 * @example @lang off <caption>Fires a `resubscription` event</caption>
 * resubscription
 *
 * @example @lang off <caption>Simulates a Prime `resubscription` event</caption>
 * resubscription --prime
 *
 * @example @lang off <caption>Simulates a Tier 3 `resubscription` event</caption>
 * resubscription --tier 3
 */
export const render = (args = {}) => {
	const {
		channel,
		channelid,
		color,
		messageid,
		months,
		prime,
		tier,
		timestamp,
		userid,
		username,
	} = {
		...defaults,
		...args,
	}

	const plan = prime ? 'Prime' : (1000 * tier)
	const planName = prime ? 'Prime' : `Tier ${tier}`

	incrementStat('event/resub')
	incrementStat('dollarbucksSaved', DOLLARBUCK_CORRELATIONS['subscription'][tier])

	return {
		'badge-info': [
			`subscriber/${months}`,
			'premium/1'
		],
		badges: [
			`subscriber/${months}`,
			'premium/1'
		],
		color: color,
		'display-name': username,
		emotes: null,
		flags: null,
		id: messageid,
		login: username,
		mod: 0,
		'msg-id': 'resub',
		'msg-param-cumulative-months': months,
		'msg-param-months': 0,
		'msg-param-should-share-streak': 0,
		'msg-param-sub-plan-name': planName,
		'msg-param-sub-plan': plan,
		'room-id': channelid,
		subscriber: 1,
		'system-msg': `${username} subscribed at ${planName}. They've subscribed for ${months} months!`,
		'tmi-sent-ts': timestamp,
		'user-id': userid,
		'user-type': null,
		message: `${HOST} USERNOTICE #${channel}`,
	}
}
