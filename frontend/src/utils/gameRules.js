export const gameRules = {
  'Memory Match': 'In Memory Match, you flip cards to find matching pairs. Try to match all pairs with the fewest attempts. The faster you finish, the higher your score.',
  'Sequence Recall': 'In Sequence Recall, a sequence of symbols appears. Memorize the exact order, then click the symbols in the same order. Each correct round increases the sequence length.',
  'Target Attention': 'In Target Attention, find the odd symbol among many. Click on the symbol that is different from the rest as quickly as possible.',
  'Stroop Effect': 'In the Stroop Effect, you see a color word printed in a different ink color. Click the ink color, not the word. This tests your inhibitory control.',
  'N‑Back': 'In N‑Back, a sequence of letters appears. Press Match if the current letter matches the one from N steps ago. Press No Match if it doesn’t. This trains working memory.',
  'Visual Search': 'In Visual Search, find and click all the target symbols hidden among distractors. Work quickly – time is limited.',
  'Choice Reaction': 'In Choice Reaction, respond to the displayed stimulus by clicking the matching option. This measures your processing speed.',
  'Card Sorting': 'In Card Sorting, cards appear with different attributes. Sort them according to the current rule (color, shape, or number). The rule changes – stay flexible!',
  'Trail Making': 'In Trail Making, connect numbered and lettered points in the correct order (1, 2, 3, … or 1, A, 2, B, …). Speed and accuracy matter.',
  'Mental Rotation': 'In Mental Rotation, choose the rotated version of the displayed shape. This trains your spatial reasoning.',
  'Digit Span': 'In Digit Span, a sequence of digits appears. After it disappears, recall the digits in the exact order. This tests your verbal working memory.',
  'Flanker Task': 'In the Flanker Task, arrows appear. Respond to the direction of the center arrow while ignoring the flanking arrows on the sides.',
  'Pattern Memory': 'In Pattern Memory, watch a flashing pattern of colors. Then repeat the pattern by clicking the colors in the same order. Each correct round adds one more step.'
};

export const getGameRule = (gameName) => {
  return gameRules[gameName] || 'No specific rules available for this game.';
};
