import { useOptions, useService } from 'hooks/async/use-request/useConfig'
import type {
  MultipleRequestOptions,
  MultipleRequestResult,
  RequestOptions,
  RequestResult,
  RequestServiceConfig,
} from './types'
import Fetch from './fetch'

function useRequest<Result, Params extends Record<string, any>>(
  service: string,
  options: Readonly<Partial<RequestOptions<Result, Params>>>,
): RequestResult<Result, Params>
function useRequest<Result, Params extends Record<string, any>>(
  service: string,
  options: Readonly<Partial<MultipleRequestOptions<Result, Params>>>,
): MultipleRequestResult<Result, Params>
function useRequest<Result, Params = Record<string, any>, Data = Params>(
  service: RequestServiceConfig<Params, Data>,
  options: Readonly<Partial<RequestOptions<Result, Params>>>,
): RequestResult<Result, Params>
function useRequest<Result, Params = Record<string, any>, Data = Params>(
  service: RequestServiceConfig<Params, Data>,
  options: Readonly<Partial<MultipleRequestOptions<Result, Params>>>,
): MultipleRequestResult<Result, Params>
function useRequest<Result, Params = Record<string, any>, Data = Params>(
  service: string | RequestServiceConfig<Params, Data>,
  options: Readonly<Partial<RequestOptions<Result, Params> | MultipleRequestOptions<Result, Params>>>,
): RequestResult<Result, Params> | MultipleRequestResult<Result, Params> {
  const _service = useService<Params, Data>(service)
  const _options = useOptions<Result, Params>(options)

  const result = new Fetch<Result, Params, Data>(_service, _options)

  return result
}

export default useRequest
