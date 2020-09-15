import { NodeVM } from 'vm2';

interface ScriptResult {
    result: string
    logs: unknown[]
}

export default (code : string, filename : string) : ScriptResult => {
  const logs : unknown[] = [];
  const vm = new NodeVM({
    console: 'redirect',
    sandbox: {
      console: {
        log(...args : unknown[]) {
          logs.push(args);
        },
      },
    },
    require: {
      external: true,
    },
    wrapper: 'commonjs',
  });

  try {
    return { result: vm.run(code, filename), logs };
  } catch (error) {
    console.error(error);
    return error;
  }
};
