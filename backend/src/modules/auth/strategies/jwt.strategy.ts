import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'kwanso_test',
    });
  }

  async validate(payload: any) {
    const { sub: id, email } = payload;
    return {
      user: {
        id,
        email,
      },
    };
  }
}
