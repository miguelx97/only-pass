import { PasswordPipe } from './password.pipe';

describe('PasswordPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordPipe(null);
    expect(pipe).toBeTruthy();
  });
});
