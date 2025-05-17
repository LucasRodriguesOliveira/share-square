export const Emoji = {
  paper: ':page_facing_up:',
  package: ':package:',
  frame: ':frame_photo:',
  book: ':closed_book:',
  microphone: ':microphone2:',
  camera: ':camera:',
  projector: ':projector:',
  unknown: ':warning:',
};

export const EmojiMap = new Map([
  ['application', Emoji.book],
  ['image', Emoji.frame],
  ['media', Emoji.projector],
  ['text', Emoji.paper],
]);
