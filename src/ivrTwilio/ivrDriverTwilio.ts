import { Config } from '../types/ivrTree';
import twilio from 'twilio';

const VoiceResponse = twilio.twiml.VoiceResponse;

export function handleNode(config: Config, nodeId: string, digit?: string): string {
  const twiml = new VoiceResponse();
  const node = config.nodes[nodeId];

  if (!node) {
    twiml.say('Invalid option. Returning to main menu.');
    twiml.redirect('/voice'); // was '/ivr/welcome'
    return twiml.toString();
  }

  // If digit is provided, we are handling a user's input
  if (digit && node.options) {
    const selectedOption = node.options.find(opt => opt.choice === digit);
    if (selectedOption) {
      if (selectedOption.action === 'gotoNode' && selectedOption.target) {
        return handleNode(config, selectedOption.target);
      } else if (selectedOption.action === 'callCenter') {
        twiml.say(`Connecting you to an agent for ${selectedOption.label}`);
        twiml.dial('YOUR_CALL_CENTER_PHONE_NUMBER');
        return twiml.toString();
      }
    }
    if (node.fallback) {
      return handleNode(config, node.fallback.target);
    }
    twiml.say('Invalid option. Returning to main menu.');
    twiml.redirect('/voice');
    return twiml.toString();
  }

  // If no digit, prompt the user
  if (node.action === 'callCenter') {
    twiml.say(node.prompt);
    twiml.dial('YOUR_CALL_CENTER_PHONE_NUMBER');
    return twiml.toString();
  }

  const gather = twiml.gather({
    action: `/voice?nodeId=${nodeId}`,
    numDigits: 1,
    method: 'POST',
  });

  gather.say(node.prompt);

  return twiml.toString();
}