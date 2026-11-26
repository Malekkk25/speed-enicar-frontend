import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard, roleGuard } from './guards-guard';
import { AuthService } from '../services/auth';

describe('TC-U05 – guards', () => {
  let auth: jasmine.SpyObj<AuthService>;
  const route = { data: { roles: ['PSYCHOLOGIST'] } } as unknown as ActivatedRouteSnapshot;
  const state = { url: '/psychologist' } as RouterStateSnapshot;
  const run = (guard: any) => TestBed.runInInjectionContext(() => guard(route, state));

  beforeEach(() => {
    auth = jasmine.createSpyObj('AuthService', ['getRole', 'isAuthenticated']);
    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: auth }] });
  });

  it('autorise le rôle PSYCHOLOGIST', () => {
    auth.getRole.and.returnValue('PSYCHOLOGIST');
    expect(run(roleGuard)).toBeTrue();
  });

  it('refuse le rôle STUDENT et redirige', () => {
    auth.getRole.and.returnValue('STUDENT');
    const r = run(roleGuard) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(r)).toBe('/auth/login');
  });

  it('redirige un utilisateur non connecté', () => {
    auth.isAuthenticated.and.returnValue(false);
    const r = run(authGuard) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(r)).toContain('/auth/login');
  });
});