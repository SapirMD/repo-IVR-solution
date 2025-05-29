import { IVRTree, GotoNode, DialNode } from '../types/ivrTreeSchema';
import twilio from 'twilio';

const VoiceResponse = twilio.twiml.VoiceResponse;

export function handleNode(ivrTree: IVRTree, nodeId: string, digit?: string): string {
  const twiml = new VoiceResponse();
  const node = ivrTree.nodes[nodeId];

  if (!node) {
    twiml.say('Invalid option. Returning to main menu.');
    twiml.redirect('/voice');
    return twiml.toString();
  }

  // Handle user input (digit)
  if (digit && 'options' in node) {
    const selectedOption = node.options.find(opt => opt.choice === digit);
    if (selectedOption) {
      if (selectedOption.action === 'gotoNode') {
        return handleNode(ivrTree, selectedOption.target);
      } else if (selectedOption.action === 'dial') {
        twiml.say(`Connecting you to ${selectedOption.label}`);
        twiml.dial(selectedOption.number);
        return twiml.toString();
      }
    }

    // If invalid digit and fallback is defined
    if (node.fallback) {
      return handleNode(ivrTree, node.fallback.target);
    }

    // No fallback — repeat main menu
    twiml.say('Invalid option. Returning to main menu.');
    twiml.redirect('/voice');
    return twiml.toString();
  }

  // No digit — we are delivering the prompt and gathering input
  if ('action' in node && node.action === 'dial') {
    // DialNode case
    twiml.say(node.prompt);
    twiml.dial(node.number);
    return twiml.toString();
  }

  if ('options' in node) {
    // GotoNode case
    const gather = twiml.gather({
      action: `/voice?nodeId=${nodeId}`,
      numDigits: 1,
      method: 'POST',
    });

    gather.say(node.prompt); // Intro prompt

    if (node.options.length > 0) {
      const optionsPrompt = node.options
        .map(opt => `press ${opt.choice} for ${opt.label}`)
        .join('. ') + '.';
      gather.say(optionsPrompt); // Options list
    }

    return twiml.toString();
  }

  // If node structure is somehow unrecognized
  twiml.say('Something went wrong. Returning to main menu.');
  twiml.redirect('/voice');
  return twiml.toString();
}