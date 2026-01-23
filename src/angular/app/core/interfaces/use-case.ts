export interface UseCase<Args, Response> {
  invoke(args: Args): Response;
}
