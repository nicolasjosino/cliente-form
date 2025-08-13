import { TestBed } from '@angular/core/testing';
import { LogService } from '../log.service';

describe('LogService', () => {
  let service: LogService;
  let consoleLogSpy: jasmine.Spy;
  let consoleWarnSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogService],
    });

    service = TestBed.inject(LogService);

    // Mock console methods
    consoleLogSpy = spyOn(console, 'log');
    consoleWarnSpy = spyOn(console, 'warn');
    consoleErrorSpy = spyOn(console, 'error');
  });

  it('should log info messages using console.log', () => {
    service.info('Test info message', 'TestContext', { id: 1 });

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const logMessage = consoleLogSpy.calls.mostRecent().args[0];

    expect(logMessage).toContain('INFO');
    expect(logMessage).toContain('Test info message');
    expect(logMessage).toContain('TestContext');
    expect(logMessage).toContain('"id":1');
  });

  it('should log warnings using console.warn', () => {
    service.warn('Test warning', 'WarningContext', { code: 'W01' });

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    const logMessage = consoleWarnSpy.calls.mostRecent().args[0];

    expect(logMessage).toContain('WARN');
    expect(logMessage).toContain('Test warning');
    expect(logMessage).toContain('WarningContext');
    expect(logMessage).toContain('"code":"W01"');
  });

  it('should log errors using console.error', () => {
    service.error('Test error', 'ErrorContext', { reason: 'fail' });

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    const logMessage = consoleErrorSpy.calls.mostRecent().args[0];

    expect(logMessage).toContain('ERROR');
    expect(logMessage).toContain('Test error');
    expect(logMessage).toContain('ErrorContext');
    expect(logMessage).toContain('"reason":"fail"');
  });

  it('should include a timestamp in the log', () => {
    service.info('Timestamp test');

    const logMessage = consoleLogSpy.calls.mostRecent().args[0];
    // Check for ISO date format
    expect(logMessage).toMatch(
      /\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/
    );
  });
});
